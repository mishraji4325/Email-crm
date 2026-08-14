import {Router} from 'express';
import { emailQueue } from '../queues/email.queue.js';

const router = Router();

router.get('/test', async(req, res)=>{
    console.log(
        "Adding job..."
        );
    await emailQueue.add(
        "generate",
        {
            leadId:"123"
        }
    );
    console.log(
        "Job added"
        );
    res.json({ message: 'Email job added to queue' });
});

export default router;