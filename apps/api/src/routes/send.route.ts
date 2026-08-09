import { Router } from "express";
import {emailQueue} from "../queues/email.queue";

const router = Router();

router.post(
    "/:emailId",
    async (req, res) => {
        await emailQueue.add(
            "send-email",
            {
                emailId: req.params.emailId
            }
        );

        res.json({
            message: "email queued"
        });
    }
);

export default router;