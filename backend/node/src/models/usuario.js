const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { esEmailValido } = require('../helpers');

const EsquemaUsuario = new mongoose.Schema({
  correoElectronico: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  correoVerificado: {
    type: Boolean,
    default: false,
  }
});

EsquemaUsuario.statics.confirmarCuenta = confirmarCuenta;
EsquemaUsuario.statics.registro = registro;
EsquemaUsuario.statics.enviarCorreoConfirmacion = enviarCorreoConfirmacion;
EsquemaUsuario.statics.inicioSesion = inicioSesion;
EsquemaUsuario.statics.buscarUsuarioPorId = buscarUsuarioPorId;

mongoose.model('usuario', EsquemaUsuario, 'usuarios');

// Métodos estáticos
function registro(infoUsuario) {
  if (!infoUsuario.correoElectronico || !esEmailValido(infoUsuario.correoElectronico)) throw new Error('correo electrónico no válido');
  if (!infoUsuario.contrasena) throw new Error('se requiere la contraseña');
  if (!infoUsuario.nombre) throw new Error('se requiere el nombre');
  if (!infoUsuario.apellido) throw new Error('se requiere el apellido');

  return this.findOne({ correoElectronico: infoUsuario.correoElectronico })
    .then(usuario => {
      if (usuario) throw new Error('el usuario ya existe');
  
      const nuevoUsuario = {
        correoElectronico: infoUsuario.correoElectronico,
        contrasena: bcrypt.hashSync(infoUsuario.contrasena, 9),
        nombre: infoUsuario.nombre,
        apellido: infoUsuario.apellido,
      };
    
      return this.create(nuevoUsuario);
    })
    .then(usuarioCreado => this.enviarCorreoConfirmacion(usuarioCreado))
    .then(usuario => usuario);
}

function enviarCorreoConfirmacion(usuario) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  var token = jwt.sign({ correoElectronico: usuario.correoElectronico }, process.env.TOKEN_SECRET);

  const urlConfirmacion = `${process.env.APIGATEWAY_URL}/cuenta/confirmar/${token}`;
  return transporter.sendMail({
    from: process.env.MAIL_ADMIN_ADDRESS,
    to: usuario.correoElectronico,
    subject: "Confirma tu correo electrónico",
    html: `<p>Confirma tu correo electrónico: <a href="${urlConfirmacion}">Confirmar</a></p>`,
  }).then(() => usuario)
}

function confirmarCuenta(token) {
  var correoElectronico = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    correoElectronico = payload.correoElectronico;
  } catch(err) {
    throw new Error('token inválido');
  }

  return this.findOne({ correoElectronico })
    .then(usuario => {
      if (!usuario) throw new Error('usuario no encontrado');
      if (usuario.correoVerificado) throw new Error('usuario ya verificado');

      usuario.correoVerificado = true;
      return usuario.save();
    });
}

function inicioSesion(correoElectronico, contrasena) {
  if (!esEmailValido(correoElectronico)) throw new Error('correo electrónico inválido');

  return this.findOne({ correoElectronico })
    .then(usuario => {
      if (!usuario) throw new Error('credenciales incorrectas');
      if (!usuario.correoVerificado) throw new Error('usuario no está verificado');

      const coinciden = bcrypt.compareSync(contrasena, usuario.contrasena);
      if (!coinciden) throw new Error('credenciales incorrectas');

      const datosUsuario = {
        _id: usuario._id,
        correoElectronico: usuario.correoElectronico,
        correoVerificado: usuario.correoVerificado,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      };
      const access_token = jwt.sign(Object.assign({}, datosUsuario), process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 4, // segundos
      });

      return {
        access_token,
      }
    })
}

function buscarUsuarioPorId(_id) {
  return this.findById(_id)
    .then(usuario => {
      return {
        _id: usuario._id,
        correoElectronico: usuario.correoElectronico,
        correoVerificado: usuario.correoVerificado,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      }
    });
}
