import { Router } from "express";
import { createTeam } from "../controllers/team.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/create', protect, createTeam);
export default router;