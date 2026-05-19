import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import importLeads from '../controllers/import.controller';

const router = Router();


router.post('/', authMiddleware, importLeads);

export default router;