import { Router } from "express";

import {
  createCampaign,getCampaigns,addLeadsToCampaign,
  getCampaignAnalytics,
  getCampaign,
  deleteCampaign,
} from "../controllers/campaign.controller";
import { adminOnly, authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createCampaign);

router.get("/:id", getCampaign);

router.delete("/:id", deleteCampaign);

router.get("/", getCampaigns);

router.post("/:id/leads", addLeadsToCampaign);

router.get('/:id/analytics', getCampaignAnalytics);

router.post("/", adminOnly, createCampaign)

export default router;