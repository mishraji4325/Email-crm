import { Router } from "express";

import {emailQueue} from "../queues/email.queue.js";

const router = Router();

router.post('/bulk', async(req,res)=>{
    const{leadIds} = req.body;
    for (const leadId of leadIds){
        await emailQueue.add("generate",{
            leadId
        });
    }
    res.json({
        message:"Bulk generation Started"
    })
})

router.post("/:leadId",async (req, res) => 
    {await emailQueue.add("generate",
            {
                leadId:req.params.leadId
            }
        );
        res.json({message:"generation started"});
    }
);

export default router;