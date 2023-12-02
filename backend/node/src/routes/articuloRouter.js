const express = require('express');
const { estaAutenticado } = require('../middlewares');
const controladorArticulo = require('../controllers/articuloController');

const router = express.Router();

router.post('/', estaAutenticado, controladorArticulo.crearArticulo);
router.get('/', estaAutenticado, controladorArticulo.obtenerArticulos);
router.get('/:id', estaAutenticado, controladorArticulo.obtenerArticulo);
router.put('/:id', estaAutenticado, controladorArticulo.actualizarArticulo);
router.delete('/:id', estaAutenticado, controladorArticulo.eliminarArticulo);

module.exports = router;
