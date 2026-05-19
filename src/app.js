require('dotenv').config();

const express = require('express');

const app = express();

// ── MIDDLEWARES GLOBALES ──────────────────────────────────────────

// express.json() permite leer JSON en POST/PUT
app.use(express.json());

// Middleware de logs
app.use((req, res, next) => {
    const timestamp = new Date().toISOString().substring(11, 19);

    console.log(`[${timestamp}] ${req.method} ${req.path}`);

    next();
});

// ── RUTAS ─────────────────────────────────────────────────────────

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        mensaje: 'StudySync API funcionando',
        version: '1.0.0',
        endpoints: [
            '/api/sesiones',
            '/auth/register',
            '/auth/login',
            '/api-docs'
        ]
    });
});

// Rutas futuras
const sesionesRouter = require('./routes/sesiones');

app.use('/api/sesiones', sesionesRouter);
// app.use('/auth', require('./routes/auth'));

// ── MANEJO GLOBAL DE ERRORES ─────────────────────────────────────

app.use((err, req, res, next) => {

    console.error('[ERROR]', err.message);

    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        timestamp: new Date().toISOString(),
        ruta: req.path
    });

});

module.exports = app;