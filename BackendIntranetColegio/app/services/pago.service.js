import { PagoSQLDao } from "../dao/pago.dao.js";
import { PagoDTO } from "../dtos/pago.dto.js";

const pagoDao = new PagoSQLDao();

export class PagoService {

  async getAllPagos() {
    const pagos = await pagoDao.getAll();
    return pagos.map(p => new PagoDTO(p));
  }

  async getPagoById(id) {
    const pago = await pagoDao.getById(id);
    if (!pago) return null;
    return new PagoDTO(pago);
  }

  async getPagosByAlumno(idAlumno) {
    const pagos = await pagoDao.getByAlumno(idAlumno);
    return pagos.map(p => new PagoDTO(p));
  }

  async createPago(data) {
    const pago = await pagoDao.create(data);
    return new PagoDTO(pago);
  }

  async deletePago(id) {
    const pago = await pagoDao.delete(id);
    if (!pago) return null;
    return new PagoDTO(pago);
  }
}
