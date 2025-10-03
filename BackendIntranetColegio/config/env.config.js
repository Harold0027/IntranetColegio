//config/env.config.js
import dotenv from "dotenv";
dotenv.config();

const env = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    DB_SERVER: process.env.DB_SERVER || 'localhost',
    DB_NAME: process.env.DB_NAME || 'IntranetColegio',
    DB_PORT: process.env.DB_PORT || '1433',
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET || "secret"
}

export default env;