import { SQLConnection, sql } from "../../config/db/connection.js";
import Nota from "../../config/models/nota.model.js";

export class NotaSQLDao {
  async getAll() {
    const pool = await SQLConnection();
    const result = await pool.request().query('SELECT * FROM Notas');
    return result.recordset.map(row => new Nota(row));
  }

  async getById(idNota) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('id', sql.Int, idNota)
      .query('SELECT * FROM Notas WHERE idNota = @id');
    if (result.recordset.length === 0) return null;
    return new Nota(result.recordset[0]);
  }

  async create({ idAlumno, nota }) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('idAlumno', sql.Int, idAlumno)
      .input('nota', sql.Decimal(5,2), nota)
      .query('INSERT INTO Notas(idAlumno, nota) OUTPUT INSERTED.* VALUES (@idAlumno, @nota)');
    return new Nota(result.recordset[0]);
  }

  async update(idNota, { idAlumno, nota }) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('id', sql.Int, idNota)
      .input('idAlumno', sql.Int, idAlumno)
      .input('nota', sql.Decimal(5,2), nota)
      .query(`UPDATE Notas 
              SET idAlumno = @idAlumno, nota = @nota
              OUTPUT INSERTED.*
              WHERE idNota = @id`);
    if (result.recordset.length === 0) return null;
    return new Nota(result.recordset[0]);
  }

  async delete(idNota) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('id', sql.Int, idNota)
      .query('DELETE FROM Notas OUTPUT DELETED.* WHERE idNota = @id');
    if (result.recordset.length === 0) return null;
    return new Nota(result.recordset[0]);
  }

  async getByAlumno(idAlumno) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input('idAlumno', sql.Int, idAlumno)
      .query('SELECT * FROM Notas WHERE idAlumno = @idAlumno');
    if (result.recordset.length === 0) return null;
    return new Nota(result.recordset[0]);
  }
}
