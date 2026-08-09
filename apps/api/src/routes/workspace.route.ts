import {Router} from 'express';
import { createWorkspace, deleteWorkspace, getAvailableUsers, getWorkspace, 
    getWorkspaces, inviteMember, joinWorkspace, 
    removeMember, 
    updateWorkspace} from '../controllers/workspace.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createWorkspace);

router.get('/:id', authMiddleware, getWorkspace)

router.get('/', authMiddleware, getWorkspaces);

router.patch('/:id/join', authMiddleware, joinWorkspace)

router.post('/:id/members', authMiddleware, inviteMember)

router.delete('/:id/members/:userId', authMiddleware, removeMember)

router.get('/:id/available-users', authMiddleware, getAvailableUsers)

router.put( "/:id", authMiddleware, updateWorkspace );

router.delete("/:id", authMiddleware, deleteWorkspace );

export default router;