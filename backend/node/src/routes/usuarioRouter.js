const express = require('express');
const { estaAutenticado } = require('../middlewares');
const controladorUsuario = require("../controllers/usuarioController");

const router = express.Router();

router.post('/registro', controladorUsuario.registro);
router.get('/confirmar/:token', controladorUsuario.confirmarCuenta);
router.post('/inicio-sesion', controladorUsuario.inicioSesion);
router.post('/usuario-actual', estaAutenticado, controladorUsuario.usuarioActual);

module.exports = router;

