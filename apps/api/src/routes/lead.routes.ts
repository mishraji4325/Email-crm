import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createLead, getLeads } from "../controllers/lead.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createLead
);

router.get(
  "/",
  authMiddleware,
  getLeads
);

export default router;