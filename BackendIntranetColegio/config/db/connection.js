// config/db/connection.js
import sql from 'mssql';
import env from '../env.config.js';

const config = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  server: env.DB_SERVER,
  database: env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export async function SQLConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Conectado a SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Error de conexión a SQL Server:', err);
    throw err;
  }
}

export { sql };
