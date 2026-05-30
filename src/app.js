require('dotenv').config();

const authRouter = require('./routes/auth');

const express = require('express');

const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger/config');

const helmet = require('helmet');

const cors = require('cors');

const rateLimit = require('express-rate-limit');

const app = express();


// ── MIDDLEWARES GLOBALES ──────────────────────────────────────────

// express.json() permite leer JSON en POST/PUT
// 1. HELMET

app.use(helmet());

// 2. CORS

app.use(cors({

  origin: process.env.CORS_ORIGIN || '*',

  methods: ['GET', 'POST', 'PUT', 'DELETE'],

  allowedHeaders: ['Content-Type', 'Authorization']

}));

// 3. RATE LIMITING

const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {

    error: 'Demasiadas peticiones. Espera 15 minutos e intenta nuevamente.'

  },

  standardHeaders: true

});

app.use('/api/', limiter);

app.use(express.json());

app.use('/api/auth', authRouter);

app.use(express.static('public'));

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

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {

    customSiteTitle: 'StudySync API Docs',

    swaggerOptions: {

      persistAuthorization: true

    }

  })
);
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