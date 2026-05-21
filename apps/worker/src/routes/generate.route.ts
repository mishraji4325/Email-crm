import {Router} from 'express';
import { emailQueue } from '../queues/email.queue';

const router = Router();

router.post('/:leadId', async(req, res)=>{
    await emailQueue.add('generate',
        {
            leadId:req.params.leadId
        }
    );
    res.json({
        message:"generation started"
    });
});

export default router;
