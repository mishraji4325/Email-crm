import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createNote, deleteNote } from '../controllers/note.controller';

const router = Router();

router.post('/', authMiddleware , createNote)

router.delete("/:id", deleteNote);

export default router;