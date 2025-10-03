// app/services/docente.service.js
import { DocenteSQLDao } from "../dao/docente.dao.js";
import { DocenteDTO } from "../dtos/docente.dto.js";

const docenteDao = new DocenteSQLDao();

export class DocenteService {
  async getAllDocentes() {
    const docentes = await docenteDao.getAll();
    return docentes.map(d => new DocenteDTO(d));
  }

  async getDocenteById(id) {
    const docente = await docenteDao.getById(id);
    if (!docente) return null;
    return new DocenteDTO(docente);
  }

  async createDocente(data) {
    const docente = await docenteDao.create(data);
    return new DocenteDTO(docente);
  }

  async updateDocente(id, data) {
    const docente = await docenteDao.update(id, data);
    if (!docente) return null;
    return new DocenteDTO(docente);
  }

  async deleteDocente(id) {
    const docente = await docenteDao.delete(id);
    if (!docente) return null;
    return new DocenteDTO(docente);
  }
}
