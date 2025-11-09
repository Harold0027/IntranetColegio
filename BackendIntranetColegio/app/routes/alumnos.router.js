// app/routes/alumnos.router.js
import { Router } from "express";
import { AlumnosController } from "../controllers/alumnos.controller.js";
import { requireSession, requireRole } from "../../middleware/auth.middleware.js";

const router = Router();
const controller = new AlumnosController(); 

router.get("/", requireSession, requireRole("user"), controller.getAll.bind(controller));
router.get("/:id", requireSession, requireRole("user"), controller.getById.bind(controller));
router.post("/", requireSession, requireRole("admin"), controller.create.bind(controller));
router.put("/:id", requireSession, requireRole("admin"), controller.update.bind(controller));
router.delete("/:id", requireSession, requireRole("admin"), controller.delete.bind(controller));

export default router;
