import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserService } from "../../app/services/user.service.js";
import bcrypt from "bcryptjs";

const userService = new UserService();

// Estrategia local para login
passport.use(
  new LocalStrategy(
    { usernameField: 'usuario', passwordField: 'contraseña' },
    async (usuario, contraseña, done) => {
      try {
        const user = await userService.getByUsername(usuario);
        if (!user) return done(null, false, { message: "Usuario no encontrado" });

        const match = await bcrypt.compare(contraseña, user.contraseña);
        if (!match) return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serializar usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.idUsuario);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserByIdFull(id); // devuelve Usuario completo
    done(null, user);
  } catch (err) {
    done(err);
  }
});
export default passport;
