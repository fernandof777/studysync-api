// src/routes/sesiones.js

const express = require('express');

const router = express.Router();

const ctrl = require('../controllers/sesionesController');

// GET → listar todas
router.get('/', ctrl.listar);

// GET → obtener una
router.get('/:id', ctrl.obtenerUna);

// POST → crear
router.post('/', ctrl.crear);

// PUT → actualizar
router.put('/:id', ctrl.actualizar);

// DELETE → eliminar
router.delete('/:id', ctrl.eliminar);

module.exports = router;