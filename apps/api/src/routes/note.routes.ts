import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import createNote from '../controllers/note.controller';

const router = Router();

router.post('/', authMiddleware , createNote)

export default router;