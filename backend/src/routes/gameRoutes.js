import { Router } from 'express';
import { createGame, deleteGame, getGame, listGames, updateGame } from '../controllers/gameController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/', listGames);
router.get('/:id', getGame);
router.post('/', requireAuth, createGame);
router.put('/:id', requireAuth, updateGame);
router.delete('/:id', requireAuth, deleteGame);

export default router;
