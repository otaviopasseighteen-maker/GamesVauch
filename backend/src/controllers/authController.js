import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import { env } from '../config/env.js';

const publicUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  displayName: user.display_name,
  role: user.role
});

const tokenFor = (user) => jwt.sign({ id: user.id, username: user.username, role: user.role }, env.jwtSecret, { expiresIn: '7d' });

export async function register(req, res, next) {
  try {
    const { username, email, password, displayName } = req.body;
    if (!username || !email || !password || !displayName) return res.status(400).json({ message: 'username, email, password and displayName are required' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must contain at least 8 characters' });

    const [existing] = await pool.execute('SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1', [username, email]);
    if (existing.length) return res.status(409).json({ message: 'Username or email already in use' });

    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute('INSERT INTO users (username, email, password_hash, display_name) VALUES (?, ?, ?, ?)', [username, email, passwordHash, displayName]);
    const user = { id: result.insertId, username, email, display_name: displayName, role: 'user' };
    res.status(201).json({ user: publicUser(user), token: tokenFor(user) });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ user: publicUser(user), token: tokenFor(user) });
  } catch (error) { next(error); }
}

export async function me(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT id, username, email, display_name, role, avatar_url, bio, created_at FROM users WHERE id = ? LIMIT 1', [req.user.id]);
    if (!rows[0]) return res.status(404).json({ message: 'User not found' });
    res.json({ user: rows[0] });
  } catch (error) { next(error); }
}
