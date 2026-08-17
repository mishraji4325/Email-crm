import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import importLeads from '../controllers/import.controller.js';

const router = Router();


router.post('/', authMiddleware, importLeads);

export default router;