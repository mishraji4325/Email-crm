import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { bookMeeting, createLead, getLeadActivities, getLeads, getLeadsById, updateLeadStatus} from "../controllers/lead.controller";

const router = Router();

router.post("/",authMiddleware,createLead);

router.get("/", authMiddleware, getLeads);

router.get('/:id/activities', authMiddleware, getLeadActivities);

router.patch('/:id/book', bookMeeting);

router.get("/:id", authMiddleware, getLeadsById);

router.patch('/:id', authMiddleware , updateLeadStatus);



export default router;