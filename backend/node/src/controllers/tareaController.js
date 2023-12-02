const obtenerModeloPorNombre = require('../db/obtenerModeloPorNombre');

function crearArticulo(req, res) {
  if (!req.body.articulo) {
    return res.status(200).send({ success: false, error: "información del artículo no encontrada" });
  }

  const Articulo = obtenerModeloPorNombre('articulo');

  try {
    Articulo.crearArticulo(req.body.articulo, req.usuario)
      .then((articulo) => {
        res.status(200).send({ success: true, data: { articulo } });
      }).catch(error => res.status(200).send({ success: false, error: error.message }));
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

function obtenerArticulos(req, res) {
  const Articulo = obtenerModeloPorNombre('articulo');

  Articulo.obtenerArticulos(req.usuario)
    .then((articulos) => {
      res.status(200).send({ success: true, data: { articulos } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

function obtenerArticulo(req, res) {
  const Articulo = obtenerModeloPorNombre('articulo');

  Articulo.obtenerArticulo(req.params.id, req.usuario)
    .then((articulo) => {
      res.status(200).send({ success: true, data: { articulo } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

function actualizarArticulo(req, res) {
  const Articulo = obtenerModeloPorNombre('articulo');

  Articulo.actualizarArticulo(req.params.id, req.body.articulo, req.usuario)
    .then((articulo) => {
      res.status(200).send({ success: true, data: { articulo } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

function eliminarArticulo(req, res) {
  const Articulo = obtenerModeloPorNombre('articulo');

  Articulo.eliminarArticulo(req.params.id, req.usuario)
    .then(() => {
      res.status(200).send({ success: true, message: 'artículo eliminado satisfactoriamente' });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

module.exports = {
  crearArticulo,
  obtenerArticulos,
  obtenerArticulo,
  actualizarArticulo,
  eliminarArticulo
};
