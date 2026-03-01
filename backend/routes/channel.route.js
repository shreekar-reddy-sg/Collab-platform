import { Router } from "express";
import { createChannel } from "../controllers/channel.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/create', protect, createChannel);
export default router;