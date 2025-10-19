// app/controllers/alumnos.controller.js
import { AlumnoService } from '../services/alumno.service.js';
const alumnoService = new AlumnoService();

export class AlumnosController {

    async getAll(req, res) {
        try {
            const alumnos = await alumnoService.getAllAlumnos();
            if(alumnos.length === 0) return res.status(404).json({ error: "No hay alumnos registrados" });
            res.json(alumnos);
        } catch (err) {
            console.error("Error en getAll:", err);
            res.status(500).json({ error: "Error al obtener alumnos" });
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if(isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const alumno = await alumnoService.getAlumnoById(id);
            if(!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

            res.json(alumno);
        } catch(err) {
            console.error("Error en getById:", err);
            res.status(500).json({ error: "Error al obtener alumno" });
        }
    }
 
    async create(req, res) {
        try {
            const { nombre, apellido, edad, telefono, activo } = req.body;
            if(!nombre || !apellido || !edad || !telefono || activo === undefined) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }

            const alumno = await alumnoService.createAlumno({ nombre, apellido, edad, telefono, activo });
            res.status(201).json({ message: "Alumno creado exitosamente", alumno });
        } catch(err) {
            console.error("Error en create:", err);
            res.status(500).json({ error: "Error al crear alumno" });
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            if(isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const { nombre, apellido, edad, telefono, activo } = req.body;
            if(!nombre || !apellido || !edad || !telefono || activo === undefined) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }

            const existente = await alumnoService.getAlumnoById(id);
            if(!existente) return res.status(404).json({ error: "Alumno no encontrado" });

            const alumno = await alumnoService.updateAlumno(id, { nombre, apellido, edad, telefono, activo });
            res.json({ message: "Alumno actualizado correctamente", alumno });
        } catch(err) {
            console.error("Error en update:", err);
            res.status(500).json({ error: "Error al actualizar alumno" });
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            if(isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const existente = await alumnoService.getAlumnoById(id);
            if(!existente) return res.status(404).json({ error: "Alumno no encontrado" });

            await alumnoService.deleteAlumno(id);
            res.json({ message: "Alumno eliminado correctamente" });
        } catch(err) {
            console.error("Error en delete:", err);
            res.status(500).json({ error: "Error al eliminar alumno" });
        }
    }
}
