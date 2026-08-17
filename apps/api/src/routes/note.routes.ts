import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createNote, deleteNote } from '../controllers/note.controller.js';

const router = Router();

router.post('/', authMiddleware , createNote)

router.delete("/:id", deleteNote);

export default router;