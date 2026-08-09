import {Router} from "express";
import {trackOpen} from "../controllers/tracking.controller";

const router = Router();

router.get('/:emailId',trackOpen);

export default router;