const express = require('express');
const app = express();
const port = 3000;
const pool = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes')

app.use(express.json());

app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Servidor de algorithm agent api corriendo el puerto: ${port}`);
})