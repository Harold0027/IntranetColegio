import { Router } from "express";
import { SessionController } from "../controllers/session.controller.js";
import { requireSession } from "../../middleware/auth.middleware.js";

const router = Router();
const controller = new SessionController();


router.post('/register', controller.register.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/logout', requireSession, controller.logout.bind(controller));

export default router;
