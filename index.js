const express = require('express');
const app = express();
const port = 3000;
const pool = require('./src/config/db');



async function proveHealthDB(req, res) {
    try {
        const result = await pool.query(
            'SELECT NOW()'
        );
        res.json(result.rows[0]);
    } catch (e) {
        console.error('Database query failed', e);
        res.status(500).json({error: 'Error al consultar la base de datos'});
    }
}

app.get('/dbtest', proveHealthDB);

app.listen(port, () => {
    console.log(`Servidor de algorithm agent api corriendo el puerto: ${port}`);
})