const  dotenv = require('dotenv');
const {Pool} =  require('pg');

dotenv.config();

const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const db_name = process.env.DB_DATABASE;

//* Creación de un pool por la aplicación entera, sera creado y reutilizado nunca crear un Pool() por request

const pool = new Pool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: db_name,
    // * ---- Especificación del pooling(Configuración) -----
    max: 20,
    min: 4,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});

pool.on('error', (err) => {
    console.error('Ocurrio un error inesperado cuando el cliente estaba inactivo', err);
});
module.exports = pool;

