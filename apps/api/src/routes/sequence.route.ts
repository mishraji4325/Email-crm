import {Router} from 'express';
import { assignLead, createSequence, createStep, deleteStep, 
    getSequence, getSequenceLeads, getSequences, removeLead, 
    updateStep } from '../controllers/sequence.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/:id', authMiddleware, getSequence);

router.get('/', authMiddleware, getSequences)

router.post('/', authMiddleware, createSequence);

router.post('/:id/steps', authMiddleware, createStep);

router.patch('/steps/:stepId', authMiddleware, updateStep);

router.delete('/steps/:stepId', authMiddleware, deleteStep);

router.get('/:id/leads', authMiddleware, getSequenceLeads);

router.post('/:id/assign', authMiddleware, assignLead);

router.delete('/:id/assign', authMiddleware, removeLead);


export default router;