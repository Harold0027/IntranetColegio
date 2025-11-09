// app/dao/alumno.dao.js
import { SQLConnection, sql } from "../../config/db/connection.js";
import Alumno from '../../config/models/alumno.model.js';

export class AlumnoSQLDao {

    async getAll() {
        const pool = await SQLConnection();
        const result = await pool.request().query('SELECT * FROM Alumnos');
        return result.recordset.map(row => new Alumno(row));
    }

    async getById(idAlumno) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idAlumno)
            .query('SELECT * FROM Alumnos WHERE idAlumno = @id');
        if(result.recordset.length === 0) return null;
        return new Alumno(result.recordset[0]);
    }

    async create({ nombre, apellido, edad, telefono, activo }) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('nombre', sql.VarChar(50), nombre)
            .input('apellido', sql.VarChar(50), apellido)
            .input('edad', sql.Int, edad)
            .input('telefono', sql.Numeric, Number(telefono)) 
            .input('activo', sql.Bit, activo)
            .query('INSERT INTO Alumnos(nombre, apellido, edad, telefono, activo) OUTPUT INSERTED.* VALUES (@nombre, @apellido, @edad, @telefono, @activo)');
        return new Alumno(result.recordset[0]); 
    }

    async update(idAlumno, { nombre, apellido, edad, telefono, activo }) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idAlumno)
            .input('nombre', sql.VarChar(50), nombre)
            .input('apellido', sql.VarChar(50), apellido)
            .input('edad', sql.Int, edad)
            .input('telefono', sql.Numeric, Number(telefono))
            .input('activo', sql.Bit, activo)
            .query(`UPDATE Alumnos 
                    SET nombre=@nombre, apellido=@apellido, edad=@edad, telefono=@telefono, activo=@activo
                    OUTPUT INSERTED.* 
                    WHERE idAlumno=@id`);
        if(result.recordset.length === 0) return null;
        return new Alumno(result.recordset[0]);
    } 

    async delete(idAlumno) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idAlumno)
            .query('DELETE FROM Alumnos OUTPUT DELETED.* WHERE idAlumno=@id');
        if(result.recordset.length === 0) return null;
        return new Alumno(result.recordset[0]);
    }
}
