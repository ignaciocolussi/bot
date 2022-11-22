'use-strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mensaje = require('./mensaje');

// Modelo de conversacion
var conversacion = Schema({
    id: String,
    ip: String,
    mensajes:[mensaje],
    intencion: String,
    entidades: [String],
    puntajes: {},
    fechaInicio: { type: Date },
    fechaFin: { type: Date, default: Date.now },
    respuesta: String
});



module.exports = mongoose.model('Conversacion', conversacion);

//lowercase y pluralizar el nombre => topics se llamara la coleccion de datos en mongodb.
//topics => documentos (schema). 