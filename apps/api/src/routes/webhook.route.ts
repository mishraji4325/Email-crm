import {Router} from "express";
import { handleReplyWebhook } from "../controllers/webhook.controller";

const router = Router();


router.post('/reply', handleReplyWebhook);

export default router;