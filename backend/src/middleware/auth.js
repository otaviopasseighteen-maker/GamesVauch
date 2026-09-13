import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    req.user = jwt.verify(header.slice(7), env.jwtSecret);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
