import passport from "passport";
import { UserService } from "../services/user.service.js";
import bcrypt from "bcryptjs";

const userService = new UserService();

export class SessionController {

    // Registro de usuario
    async register(req, res) {
        try {
            const { usuario, contraseña, rol } = req.body;
            //validar que no se repitan usuarios
            const existingUser = await userService.getByUsername(usuario);
            if (existingUser) {
                return res.status(400).json({ error: "El usuario ya existe" });
            }
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            const user = await userService.createUser({ usuario, contraseña: hashedPassword, rol });
            res.status(201).json({message:"Registro exitoso ", user});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Login
    async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if(err) return next(err);
            if(!user) return res.status(401).json({ error: info.message });
            req.login(user, { session: true }, err => {
                if(err) return next(err);
                res.json({ message: "Login exitoso", user });
            });
        })(req,res,next);
    }

    // Logout
    async logout(req,res) {
        req.logout(err => {
            if(err) return res.status(500).json({ error: "Error al cerrar sesión" });
            res.json({ message: "Logout exitoso" });
        });
    }
}
