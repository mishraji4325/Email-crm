import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createLead, getLeads, getLeadsById, updateLeadStatus} from "../controllers/lead.controller";

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

router.get(
  "/:id", authMiddleware, getLeadsById
);

router.patch('/:id', authMiddleware , updateLeadStatus)

export default router;