const mongoose = require('mongoose');

const EsquemaArticulo = new mongoose.Schema({
  autor: {
    type: String,
    required: true,
    trim: true,
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  imagen: {
    type: String, // Puedes ajustar esto según el tipo de almacenamiento de imágenes que estés utilizando (p. ej., String para la URL de la imagen o Buffer para almacenar la imagen directamente).
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
});

EsquemaArticulo.statics.crear = crearArticulo;
EsquemaArticulo.statics.obtenerArticulos = obtenerArticulos;
EsquemaArticulo.statics.obtenerArticulo = obtenerArticulo;
EsquemaArticulo.statics.actualizarArticulo = actualizarArticulo;
EsquemaArticulo.statics.eliminarArticulo = eliminarArticulo;

mongoose.model('articulo', EsquemaArticulo, 'articulos');

function crearArticulo(infoArticulo, usuario) {
  if (!infoArticulo.titulo) throw new Error('se requiere el título');

  infoArticulo.usuarioId = usuario._id;

  const articulo = new this(infoArticulo);
  return articulo.save();
}

function obtenerArticulos(usuario) {
  return this.find({ usuarioId: usuario._id });
}

function obtenerArticulo(articuloId, usuario) {
  return this.findOne({ _id: articuloId, usuarioId: usuario._id })
    .then(articulo => {
      if (!articulo) throw new Error('artículo no encontrado');

      return articulo;
    });
}

function actualizarArticulo(articuloId, infoArticulo = {}, usuario) {
  const actualizacion = {};
  if (infoArticulo.titulo) actualizacion.titulo = infoArticulo.titulo;
  if (infoArticulo.descripcion) actualizacion.descripcion = infoArticulo.descripcion;
  if (infoArticulo.contenido) actualizacion.contenido = infoArticulo.contenido;
  if (infoArticulo.imagen) actualizacion.imagen = infoArticulo.imagen;

  return this.findOne({ _id: articuloId, usuarioId: usuario._id })
    .then(articulo => {
      if (!articulo) throw new Error('artículo no encontrado');
      if (Object.keys(actualizacion).length === 0) return articulo;

      articulo.set(actualizacion);
      return articulo.save();
    });
}

function eliminarArticulo(articuloId, usuario) {
  return this.findOne({ _id: articuloId, usuarioId: usuario._id })
    .then(articulo => {
      if (!articulo) throw new Error('artículo no encontrado');

      return articulo.remove();
    });
}
