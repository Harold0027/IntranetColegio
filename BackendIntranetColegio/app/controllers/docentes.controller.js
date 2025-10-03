// app/controllers/docentes.controller.js
import { DocenteService } from "../services/docente.service.js";

const docenteService = new DocenteService();

export class DocentesController {
  async getAll(req, res) {
    try {
      const docentes = await docenteService.getAllDocentes();
      if (docentes.length === 0) {
        return res.status(404).json({ error: "No existen docentes registrados" });
      }
      res.json(docentes);
    } catch (err) {
      console.error("Error en getAll:", err);
      res.status(500).json({ error: "Error al obtener docentes" });
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const docente = await docenteService.getDocenteById(id);
      if (!docente) return res.status(404).json({ error: "Docente no encontrado" });

      res.json(docente);
    } catch (err) {
      console.error("Error en getById:", err);
      res.status(500).json({ error: "Error al obtener docente" });
    }
  }

  async create(req, res) {
    try {
      const { nombre, apellido, edad, telefono, salario, activo } = req.body;

      if (!nombre || !apellido || !edad || !telefono || salario == null || activo == null) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const docente = await docenteService.createDocente({ nombre, apellido, edad, telefono, salario, activo });
      res.status(201).json({ message: "Docente creado exitosamente", docente });
    } catch (err) {
      console.error("Error en create:", err);
      res.status(500).json({ error: "Error al crear docente" });
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const { nombre, apellido, edad, telefono, salario, activo } = req.body;
      if (!nombre || !apellido || !edad || !telefono || salario == null || activo == null) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const existente = await docenteService.getDocenteById(id);
      if (!existente) {
        return res.status(404).json({ error: "Docente no encontrado" });
      }

      const docente = await docenteService.updateDocente(id, { nombre, apellido, edad, telefono, salario, activo });
      res.json({ message: "Docente actualizado correctamente", docente });
    } catch (err) {
      console.error("Error en update:", err);
      res.status(500).json({ error: "Error al actualizar docente" });
    }
  }

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const existente = await docenteService.getDocenteById(id);
      if (!existente) {
        return res.status(404).json({ error: "Docente no encontrado" });
      }

      await docenteService.deleteDocente(id);
      res.json({ message: "Docente eliminado correctamente" });
    } catch (err) {
      console.error("Error en delete:", err);
      res.status(500).json({ error: "Error al eliminar docente" });
    }
  }
}
