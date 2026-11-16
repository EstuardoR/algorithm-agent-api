// Aquí va el desarrollo de crearUsuario y buscarPorCorreo

const pool = require('../config/db');

async function searchWithEmail(email) {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0]; // undefined si no existe
}


async function createUser({ name, email, passwordHash }) {
    const result = await pool.query(
        'INSERT INTO users(name, email, password_hash) VALUES ($1, $2, $3) RETURNING id_user, name, email, rol',
        [name, email, passwordHash]

    );
    return result.rows[0];
}

module.exports = { searchWithEmail, createUser };