// app/routes/docentes.router.js
import { Router } from "express";
import { DocentesController } from "../controllers/docentes.controller.js";
import { requireSession, requireRole } from "../../middleware/auth.middleware.js";

const router = Router();
const controller = new DocentesController();

router.get("/", requireSession, requireRole("user"), controller.getAll.bind(controller));
router.get("/:id", requireSession, requireRole("user"), controller.getById.bind(controller));
router.post("/", requireSession, requireRole("admin"), controller.create.bind(controller));
router.put("/:id", requireSession, requireRole("admin"), controller.update.bind(controller));
router.delete("/:id", requireSession, requireRole("admin"), controller.delete.bind(controller));

export default router;
