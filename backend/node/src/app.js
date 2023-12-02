const express = require('express');
const bodyParser = require('body-parser');
const _conectar = require('./db/_conectar');
const rutasUsuario = require('./routes/usuarioRouter');
const rutasTarea = require('./routes/articuloRouter');

// Configurar dotenv
require('dotenv').config();

// Conexión a MongoDB
_conectar();

const app = express();

// Configuración
app.use(bodyParser.json());

// Rutas
app.use('/cuenta', rutasUsuario);
app.use('/tareas', rutasTarea);

app.listen(process.env.PORT, () => console.log('Aplicación escuchando en el puerto ' + process.env.PORT));
