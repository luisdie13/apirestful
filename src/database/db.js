import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, // Nota: el nombre de la variable de entorno es DB_DATABASE, no DB_NAME.
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Función de prueba para la conexión
const checkConnection = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Conexión a la base de datos establecida.');
    } catch (err) {
        console.error('❌ Error de conexión a la base de datos:', err.message);
        // Opcional: Terminar el proceso si no se puede conectar para evitar errores posteriores.
        // process.exit(1); 
    }
};

checkConnection();

export default pool;