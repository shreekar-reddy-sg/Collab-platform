import { Router } from "express";
import { createTeam } from "../controllers/team.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post('/create', protect, createTeam);
export default router;