import {Router} from 'express';
import { getLeadEmails, updateEmail } from '../controllers/email.controller.js';

const router = Router();

router.get('/lead/:leadId', getLeadEmails);
router.patch('/:id', updateEmail
);

export default router;