import { SQLConnection, sql } from "../../config/db/connection.js";
import Pago from "../../config/models/pago.model.js";

export class PagoSQLDao {

  async getAll() {
    const pool = await SQLConnection();
    const result = await pool.request().query('SELECT * FROM Pagos');
    return result.recordset.map(p => new Pago(p));
  }

  async getById(idPago) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('id', sql.Int, idPago)
      .query('SELECT * FROM Pagos WHERE idPago = @id');
    if (result.recordset.length === 0) return null;
    return new Pago(result.recordset[0]);
  }

  async getByAlumno(idAlumno) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('idAlumno', sql.Int, idAlumno)
      .query('SELECT * FROM Pagos WHERE idAlumno = @idAlumno');
    return result.recordset.map(p => new Pago(p));
  }

  async create({ idAlumno, monto, fechaPago, estado }) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('idAlumno', sql.Int, idAlumno)
      .input('monto', sql.Decimal(10,2), monto)
      .input('fechaPago', sql.DateTime, fechaPago)
      .input('estado', sql.VarChar(20), estado)
      .query('INSERT INTO Pagos(idAlumno, monto, fechaPago, estado) OUTPUT INSERTED.* VALUES (@idAlumno, @monto, @fechaPago, @estado)');
    return new Pago(result.recordset[0]);
  }

  async delete(idPago) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('id', sql.Int, idPago)
      .query('DELETE FROM Pagos OUTPUT DELETED.* WHERE idPago = @id');
    if (result.recordset.length === 0) return null;
    return new Pago(result.recordset[0]);
  }
}
