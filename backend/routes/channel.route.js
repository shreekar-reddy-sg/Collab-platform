import { Router } from "express";
import { createChannel } from "../controllers/channel.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post('/create', protect, createChannel);
export default router;