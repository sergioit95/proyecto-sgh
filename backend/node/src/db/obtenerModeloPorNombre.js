const mongoose = require('mongoose');

require('../models/usuario');
require('../models/articulo');

function obtenerModeloPorNombre(nombre) {
  return mongoose.model(nombre);
}

module.exports = obtenerModeloPorNombre;
