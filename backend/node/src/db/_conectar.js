const mongoose = require('mongoose');

function _conectar() {
  const URI = "mongodb://" + process.env.MONGO_HOST + "/" + process.env.MONGO_DB;
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
      console.log('conexión a la base de datos lista para usar.');
    },
    (err) => {
      console.log('error de conexión - ', err);
    },
  );
}

module.exports = _conectar;
