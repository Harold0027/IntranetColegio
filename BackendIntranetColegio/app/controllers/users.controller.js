// app/controller/users.controller.js
import { UserService } from '../services/user.service.js';

const userService = new UserService();

export class UsersController {

    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            if (users.length === 0) {
                return res.status(404).json({ error: "No existen usuarios registrados" });
            }
            res.json(users);
        } catch (err) {
            console.error("Error en getAll:", err);
            res.status(500).json({ error: "Error al obtener usuarios" });
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

            res.json(user);
        } catch (err) {
            console.error("Error en getById:", err);
            res.status(500).json({ error: "Error al obtener usuario" });
        }
    }

    async create(req, res) {
        try {
            const { usuario, contraseña, rol } = req.body;

            if (!usuario || !contraseña || !rol) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }
            const existente = await userService.getByUsername(usuario);
            if (existente) {
                return res.status(409).json({ error: "El usuario ya existe" });
            }

            const user = await userService.createUser({ usuario, contraseña, rol });
            res.status(201).json({ message: "Usuario creado exitosamente", user });

        } catch (err) {
            console.error("Error en create:", err);
            res.status(500).json({ error: "Error al crear usuario" });
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const { usuario, contraseña, rol } = req.body;
            if (!usuario || !contraseña || !rol) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }

            const existente = await userService.getUserById(id);
            if (!existente) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            const duplicado = await userService.getByUsername(usuario);
            if (duplicado && duplicado.idUsuario !== id) {
                return res.status(409).json({ error: "El nombre de usuario ya está en uso" });
            }

            const user = await userService.updateUser(id, { usuario, contraseña, rol });
            res.json({ message: "Usuario actualizado correctamente", user });

        } catch (err) {
            console.error("Error en update:", err);
            res.status(500).json({ error: "Error al actualizar usuario" });
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const existente = await userService.getUserById(id);
            if (!existente) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            await userService.deleteUser(id);
            res.json({ message: "Usuario eliminado correctamente" });

        } catch (err) {
            console.error("Error en delete:", err);
            res.status(500).json({ error: "Error al eliminar usuario" });
        }
    }
}
