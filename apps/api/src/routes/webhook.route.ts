import {Router} from "express";
import { handleReplyWebhook } from "../controllers/webhook.controller.js";

const router = Router();


router.post('/reply', handleReplyWebhook);

export default router;