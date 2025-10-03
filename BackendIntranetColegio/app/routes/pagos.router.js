import { Router } from "express";
import { PagosController } from "../controllers/pagos.controller.js";
import { requireSession, requireRole } from "../../middleware/auth.middleware.js";

const router = Router();
const controller = new PagosController();

router.get("/", requireSession, requireRole("admin"), controller.getAll.bind(controller));
router.get("/:id", requireSession, requireRole("admin"), controller.getById.bind(controller));
router.get("/alumno/:idAlumno", requireSession, requireRole("user"), controller.getByAlumno.bind(controller));
router.post("/", requireSession, requireRole("admin"), controller.create.bind(controller));
router.delete("/:id", requireSession, requireRole("admin"), controller.delete.bind(controller));

export default router;
