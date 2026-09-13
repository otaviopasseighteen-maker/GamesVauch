import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { pool } from './config/database.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', service: 'GamesVauch API' });
  } catch (error) {
    res.status(503).json({ status: 'degraded', database: 'unavailable', message: error.message });
  }
});

app.get('/api', (_req, res) => {
  res.json({
    name: 'GamesVauch API',
    version: '0.1.0',
    endpoints: ['/api/health']
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(env.port, () => {
  console.log(`GamesVauch API running on http://localhost:${env.port}`);
});
