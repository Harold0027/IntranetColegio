import { NotaSQLDao } from "../dao/nota.dao.js";
import { NotaDTO } from "../dtos/nota.dto.js";

const notaDao = new NotaSQLDao();

export class NotaService {
  async getAllNotas() {
    const notas = await notaDao.getAll();
    return notas.map(n => new NotaDTO(n));
  }

  async getNotaById(id) {
    const nota = await notaDao.getById(id);
    if (!nota) return null;
    return new NotaDTO(nota);
  }

  async createNota(data) {
    const nota = await notaDao.create(data);
    return new NotaDTO(nota);
  }

  async updateNota(id, data) {
    const nota = await notaDao.update(id, data);
    if (!nota) return null;
    return new NotaDTO(nota);
  }

  async deleteNota(id) {
    const nota = await notaDao.delete(id);
    if (!nota) return null;
    return new NotaDTO(nota);
  }

  async getByAlumno(idAlumno) {
    const nota = await notaDao.getByAlumno(idAlumno);
    if (!nota) return null;
    return new NotaDTO(nota);
  }
}
