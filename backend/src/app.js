const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
app.use
//Rutas
app.get('/', (req, res) =>{
    res.send({message: "Hola Mundo"});
})