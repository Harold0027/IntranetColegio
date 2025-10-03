import { NotaService } from "../services/nota.service.js";
const notaService = new NotaService();

export class NotasController {
  async getAll(req, res) {
    try {
      const notas = await notaService.getAllNotas();
      if (notas.length === 0) return res.status(404).json({ error: "No existen notas registradas" });
      res.json(notas);
    } catch (err) {
      console.error("Error en getAll:", err);
      res.status(500).json({ error: "Error al obtener notas" });
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const nota = await notaService.getNotaById(id);
      if (!nota) return res.status(404).json({ error: "Nota no encontrada" });

      res.json(nota);
    } catch (err) {
      console.error("Error en getById:", err);
      res.status(500).json({ error: "Error al obtener nota" });
    }
  }

  async create(req, res) {
    try {
      const { idAlumno, nota } = req.body;
      if (!idAlumno || nota == null) return res.status(400).json({ error: "Faltan campos obligatorios" });

      const notaCreada = await notaService.createNota({ idAlumno, nota });
      res.status(201).json({ message: "Nota creada exitosamente", nota: notaCreada });

    } catch (err) {
      console.error("Error en create:", err);
      res.status(500).json({ error: "Error al crear nota" });
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const { idAlumno, nota } = req.body;
      if (!idAlumno || nota == null) return res.status(400).json({ error: "Faltan campos obligatorios" });

      const existente = await notaService.getNotaById(id);
      if (!existente) return res.status(404).json({ error: "Nota no encontrada" });

      const notaActualizada = await notaService.updateNota(id, { idAlumno, nota });
      res.json({ message: "Nota actualizada correctamente", nota: notaActualizada });

    } catch (err) {
      console.error("Error en update:", err);
      res.status(500).json({ error: "Error al actualizar nota" });
    }
  }

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const existente = await notaService.getNotaById(id);
      if (!existente) return res.status(404).json({ error: "Nota no encontrada" });

      await notaService.deleteNota(id);
      res.json({ message: "Nota eliminada correctamente" });

    } catch (err) {
      console.error("Error en delete:", err);
      res.status(500).json({ error: "Error al eliminar nota" });
    }
  }
}
