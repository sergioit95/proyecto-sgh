const obtenerModeloPorNombre = require('../db/obtenerModeloPorNombre');

function registro(req, res) {
  if (!req.body.usuario) {
    return res.status(400).send({ success: false, error: "información del usuario no encontrada" });
  }

  const Usuario = obtenerModeloPorNombre('usuario');

  try {
    Usuario.registro(req.body.usuario)
      .then(() => {
        res.status(200).send({ success: true, message: 'usuario creado exitosamente' });
      }).catch(error => res.status(200).send({ success: false, error: error.message }));
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}


function confirmarCuenta(req, res) {
  const Usuario = obtenerModeloPorNombre('usuario');

  try {
    Usuario.confirmarCuenta(req.params.token)
      .then(() => {
        res.status(200).send({ success: true, message: "usuario confirmado exitosamente" });
      }).catch(err => res.status(200).send({ success: false, error: err.message }))
  } catch (err) {
    res.status(200).send({ success: false, error: err.message });
  }
}

function inicioSesion(req, res) {
  if (!req.body.correoElectronico) {
    return res.status(200).send({ success: false, error: "correo electrónico no proporcionado" });
  }

  if (!req.body.contrasena) {
    return res.status(200).send({ success: false, error: "contraseña no proporcionada" });
  }

  const Usuario = obtenerModeloPorNombre('usuario');

  try {
    Usuario.inicioSesion(req.body.correoElectronico, req.body.contrasena)
      .then((data) => {
        res.status(200).send({ success: true, data });
      }).catch(err => res.status(200).send({ success: false, error: err.message }))
  } catch (err) {
    res.status(200).send({ success: false, error: err.message });
  }
}





function usuarioActual(req, res) {
  if (!req.usuario) return res.status(200).send({ success: true, data: { usuario: null } });

  const Usuario = obtenerModeloPorNombre('usuario');

  return Usuario.buscarUsuarioPorId(req.usuario._id)
    .then((usuario) => {
      res.status(200).send({ success: true, data: { usuario } });
    }).catch(err => res.status(200).send({ success: false, error: err.message }))
}

module.exports = {
  registro,
  confirmarCuenta,
  inicioSesion,
  usuarioActual
};
