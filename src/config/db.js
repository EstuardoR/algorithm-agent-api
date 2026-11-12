const {Pool} =  require('pg');

const port = process.env.PORT;
const host = process.env.HOST;
const password = process.env.PASSWORD;
const user = process.env.USER;
const db_name = process.env.DATABASE;

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

