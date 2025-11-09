import {Router} from "express";
import { UsersController } from "../controllers/users.controller.js";
import { requireSession, requireRole } from "../../middleware/auth.middleware.js";

const router = Router();
const controller = new UsersController();

router.get('/', requireSession, requireRole('user'), controller.getAll.bind(controller));
router.get('/:id', requireSession, requireRole('admin'), controller.getById.bind(controller));
router.post('/', requireSession, requireRole('admin'), controller.create.bind(controller));
router.put('/:id', requireSession, requireRole('admin'), controller.update.bind(controller));
router.delete('/:id', requireSession, requireRole('admin'), controller.delete.bind(controller));

export default router;  