import { poolPromise } from './config/db/connection.js';

(async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT 1 AS prueba');
        console.log(result.recordset); // [{ prueba: 1 }]
    } catch (err) {
        console.error('Error de prueba:', err);
    }
})();
