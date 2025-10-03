// app/services/alumno.service.js
import { AlumnoSQLDao } from "../dao/alumno.dao.js";
import { AlumnoDTO } from "../dtos/alumno.dto.js";

const alumnoDao = new AlumnoSQLDao();

export class AlumnoService {

    async getAllAlumnos() {
        const alumnos = await alumnoDao.getAll();
        return alumnos.map(a => new AlumnoDTO(a));
    }

    async getAlumnoById(id) {
        const alumno = await alumnoDao.getById(id);
        if(!alumno) return null;
        return new AlumnoDTO(alumno);
    }

    async createAlumno(data) {
        const alumno = await alumnoDao.create(data);
        return new AlumnoDTO(alumno);
    }

    async updateAlumno(id, data) {
        const alumno = await alumnoDao.update(id, data);
        if(!alumno) return null;
        return new AlumnoDTO(alumno);
    }

    async deleteAlumno(id) {
        const alumno = await alumnoDao.delete(id);
        if(!alumno) return null;
        return new AlumnoDTO(alumno);
    }
}
