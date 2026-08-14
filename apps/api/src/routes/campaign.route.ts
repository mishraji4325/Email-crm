import { Router } from "express";

import {
    createCampaign,
    getCampaigns,
    addLeadsToCampaign,
    getCampaignAnalytics,
    getCampaign,
    deleteCampaign,
} from "../controllers/campaign.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getCampaigns);
router.post("/", createCampaign);

router.get("/:id/analytics", getCampaignAnalytics);
router.post("/:id/leads", addLeadsToCampaign);

router.get("/:id", getCampaign);
router.delete("/:id", deleteCampaign);

export default router;
