// app/dao/docente.sql.dao.js
import { SQLConnection, sql } from "../../config/db/connection.js";
import Docente from "../../config/models/docente.model.js";

export class DocenteSQLDao {
  async getAll() {
    const pool = await SQLConnection();
    const result = await pool.request().query("SELECT * FROM Docentes");
    return result.recordset.map(row => new Docente(row));
  }

  async getById(idDocente) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input("id", sql.Int, idDocente)
      .query("SELECT * FROM Docentes WHERE idDocente = @id");
    if (result.recordset.length === 0) return null;
    return new Docente(result.recordset[0]);
  }

  async create({ nombre, apellido, edad, telefono, salario, activo }) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar(50), nombre)
      .input("apellido", sql.VarChar(50), apellido)
      .input("edad", sql.Int, edad)
      .input("telefono", sql.VarChar(20), telefono)
      .input("salario", sql.Decimal(10, 2), salario)
      .input("activo", sql.Bit, activo)
      .query(`INSERT INTO Docentes (nombre, apellido, edad, telefono, salario, activo) 
              OUTPUT INSERTED.* 
              VALUES (@nombre, @apellido, @edad, @telefono, @salario, @activo)`);
    return new Docente(result.recordset[0]);
  }

  async update(idDocente, { nombre, apellido, edad, telefono, salario, activo }) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input("id", sql.Int, idDocente)
      .input("nombre", sql.VarChar(50), nombre)
      .input("apellido", sql.VarChar(50), apellido)
      .input("edad", sql.Int, edad)
      .input("telefono", sql.Numeric, Number(telefono))
      .input("salario", sql.Decimal(10, 2), salario) 
      .input("activo", sql.Bit, activo) 
      .query(`UPDATE Docentes 
              SET nombre = @nombre, apellido = @apellido, edad = @edad, 
                  telefono = @telefono, salario = @salario, activo = @activo 
              OUTPUT INSERTED.* 
              WHERE idDocente = @id`);
    if (result.recordset.length === 0) return null;
    return new Docente(result.recordset[0]);
  }

  async delete(idDocente) {
    const pool = await SQLConnection();
    const result = await pool.request()
      .input("id", sql.Int, idDocente)
      .query("DELETE FROM Docentes OUTPUT DELETED.* WHERE idDocente = @id");
    if (result.recordset.length === 0) return null;
    return new Docente(result.recordset[0]);
  }
}
