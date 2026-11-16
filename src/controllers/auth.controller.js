// register, login
const bcrypt = require('bcrypt');
const { createUser } = require('../models/user.model');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: Migrar validaciones a otro archivo implementando Zod


async function register(req, res) {
    try {
        const { name, email, password_hash } = req.body;


        // 1. Validar tipos;
        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof password_hash !== 'string'
        ) {
            return res.status(400).json({
                status: 'error',
                message: 'name, email y passowrd son campos obligatorios'
            });
        }

        // 2. normalizar (guardando el resultado)
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        //3. Validar contenido 

        if (!cleanName || cleanName.length > 100) {
            return res.status(400).json({ status: 'error', message: 'Nombre invalido' });
        }
        if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 100) {
            return res.status(400).json({ status: 'error', message: 'Correo invalido' });
        }

        if (password_hash.length < 8. || Buffer.byteLength(password_hash, 'utf-8') > 72) {
            return res.status(400).json({
                status: 'error', message: 'La contraseña debe tener entre 8 y 72 caracteres'
            });
        }

        // 4. con datos validos, hashear la contraseña
        const passwordHash = await bcrypt.hash(password_hash, 12) // 12 = salt rounds

        const newUser = await createUser({ name: cleanEmail, email: cleanEmail, passwordHash });


        return res.status(201).json(newUser);


    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                status: 'error',
                message: 'El correo ya esta registrado',
            })
        }

        console.error('Error al registrar usuario:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
}


module.exports = { register }