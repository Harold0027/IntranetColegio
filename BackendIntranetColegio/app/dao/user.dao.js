// app/dao/user.sql.dao.js
import { SQLConnection, sql } from "../../config/db/connection.js";
import Usuario from '../../config/models/user.model.js';

export class UserSQLDao{
    async getAll(){
        const pool = await SQLConnection();
        const result = await pool.request().query('SELECT * FROM Usuarios')
        return result.recordset.map(row => new Usuario(row));
    }

    async getById(idUsuario){
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idUsuario)
            .query('SELECT * FROM Usuarios WHERE idUsuario = @id');
        if(result.recordset.length === 0) return null;
        return new Usuario(result.recordset[0]);
    }

    async create({usuario, contraseña, rol}){
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('usuario', sql.VarChar(50), usuario)
            .input('contraseña', sql.VarChar(255), contraseña)
            .input('rol', sql.VarChar(20), rol)
            .query('INSERT INTO Usuarios(usuario,contraseña,rol) OUTPUT INSERTED.* VALUES (@usuario, @contraseña, @rol)');
        return new Usuario(result.recordset[0]); 
    }
    
        async update(idUsuario, {usuario, contraseña, rol}) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idUsuario)
            .input('usuario', sql.VarChar(50), usuario)
            .input('contraseña', sql.VarChar(255), contraseña)
            .input('rol', sql.VarChar(20), rol)
            .query(`UPDATE Usuarios 
                    SET usuario = @usuario, contraseña = @contraseña, rol = @rol
                    OUTPUT INSERTED.* 
                    WHERE idUsuario = @id`);
        if(result.recordset.length === 0) return null;
        return new Usuario(result.recordset[0]);
    }

    async delete(idUsuario) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idUsuario)
            .query('DELETE FROM Usuarios OUTPUT DELETED.* WHERE idUsuario = @id');
        if(result.recordset.length === 0) return null;
        return new Usuario(result.recordset[0]);
    }

    async getByUsername(usuario) {
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('usuario', sql.VarChar(50), usuario)
            .query('SELECT * FROM Usuarios WHERE usuario = @usuario');

        if(result.recordset.length === 0) return null;
        return new Usuario(result.recordset[0]);
    }

    async getByIdFull(idUsuario){
        const pool = await SQLConnection();
        const result = await pool.request()
            .input('id', sql.Int, idUsuario)
            .query('SELECT * FROM Usuarios WHERE idUsuario = @id');
        if(result.recordset.length === 0) return null;
        return new Usuario(result.recordset[0]);
    }
}