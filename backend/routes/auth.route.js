import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post('/register', register);
router.post('/login', protect, login);

export default router;