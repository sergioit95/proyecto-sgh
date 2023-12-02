const jwt = require('jsonwebtoken');

function estaAutenticado(req, res, next) {
  const access_token = req.headers.access_token;
  if (!access_token) return res.status(403).send({ success: false, message: 'usuario no autorizado' });

  if (access_token) {
    const usuario = verificarTokenAutenticacion(access_token);
    if (!usuario) return res.status(403).send({ success: false, message: 'usuario no autorizado' });

    req.usuario = usuario;
  }

  next();
}

function verificarTokenAutenticacion(token) {
  var usuario = null;
  try {
    usuario = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch(err) {

  }

  return usuario;
}

module.exports = estaAutenticado;
