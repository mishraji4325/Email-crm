import {Router} from 'express';
import { getAnalytics, getPipelineAnalytics, getFunnelAnalytics } from '../controllers/analytics.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getAnalytics);

router.get('/pipeline', authMiddleware, getPipelineAnalytics);

router.get("/funnel", authMiddleware,getFunnelAnalytics);

export default router