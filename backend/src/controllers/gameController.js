import { pool } from '../config/database.js';

export async function listGames(req, res, next) {
  try {
    const { q = '', genre, platform, limit = 24, offset = 0 } = req.query;
    const safeLimit = Math.min(Math.max(Number(limit) || 24, 1), 100);
    const safeOffset = Math.max(Number(offset) || 0, 0);
    const where = [];
    const params = [];
    if (q) { where.push('title LIKE ?'); params.push(`%${q}%`); }
    if (genre) { where.push('genre = ?'); params.push(genre); }
    if (platform) { where.push('platform = ?'); params.push(platform); }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const [rows] = await pool.execute(`SELECT id, title, description, cover_url, release_date, developer, publisher, genre, platform FROM games ${clause} ORDER BY title LIMIT ${safeLimit} OFFSET ${safeOffset}`, params);
    res.json({ games: rows, pagination: { limit: safeLimit, offset: safeOffset } });
  } catch (error) { next(error); }
}

export async function getGame(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM games WHERE id = ? LIMIT 1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: 'Game not found' });
    res.json({ game: rows[0] });
  } catch (error) { next(error); }
}

export async function createGame(req, res, next) {
  try {
    const { title, description, coverUrl, releaseDate, developer, publisher, genre, platform } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'title is required' });
    const [result] = await pool.execute('INSERT INTO games (title, description, cover_url, release_date, developer, publisher, genre, platform) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title.trim(), description || null, coverUrl || null, releaseDate || null, developer || null, publisher || null, genre || null, platform || null]);
    res.status(201).json({ id: result.insertId });
  } catch (error) { next(error); }
}

export async function updateGame(req, res, next) {
  try {
    const { title, description, coverUrl, releaseDate, developer, publisher, genre, platform } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'title is required' });
    const [result] = await pool.execute('UPDATE games SET title=?, description=?, cover_url=?, release_date=?, developer=?, publisher=?, genre=?, platform=? WHERE id=?', [title.trim(), description || null, coverUrl || null, releaseDate || null, developer || null, publisher || null, genre || null, platform || null, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Game not found' });
    res.json({ message: 'Game updated' });
  } catch (error) { next(error); }
}

export async function deleteGame(req, res, next) {
  try {
    const [result] = await pool.execute('DELETE FROM games WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Game not found' });
    res.status(204).send();
  } catch (error) { next(error); }
}
