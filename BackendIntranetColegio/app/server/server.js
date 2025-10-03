import express from "express";
import session from "express-session";
import passport from "../../config/auth/passport.config.js";
import usersRouter from "../routes/users.router.js";
import sessionsRouter from "../routes/session.router.js";
import docentesRouter from "../routes/docentes.router.js";
import alumnosRouter from "../routes/alumnos.router.js";
import notasRouter from "../routes/notas.router.js";
import pagosRouter from "../routes/pagos.router.js";
import env from "../../config/env.config.js"
import { SQLConnection } from "../../config/db/connection.js"

const app = express();
const PORT = env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


export const StartServer = async ()=>{
    //conexion DB
    await SQLConnection();

    //configuracion de sesiones
    app.use(session({
        secret: env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000*60*60} //1HORA
    }));

    //incializar passport
    app.use(passport.initialize());
    app.use(passport.session());

    //rutas
    app.use("/api/user", usersRouter);
    app.use("/api/session", sessionsRouter);
    app.use("/api/docente", docentesRouter);
    app.use("/api/alumno", alumnosRouter);
    app.use("/api/nota", notasRouter);
    app.use("/api/pago", pagosRouter);

    //error handling simple
    app.use((err,req,res,next)=>{
        console.log(err);
        res.status(500).json({error: "Ocurrio un error en el servidor"})
    });

    //Start
    app.listen(PORT, ()=>{
        console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
};
