const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, MONGO_DB_URI_DEVELOPMENT, NODE_ENV } = process.env


const connectionString = NODE_ENV == 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI


if (!connectionString) {
  console.error('No hay string de conexion a mongo')
}

mongoose.Promise = global.Promise;

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✔ Se conecto la DB')
  }).catch(err => {
    console.error(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})