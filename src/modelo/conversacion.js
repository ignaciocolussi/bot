'use-strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// Modelo de MESSAGE
var conversacionSchema = Schema({
    id: String,
    ip: String,
    mensaje: String,
    intencion: String,
    entidades:[String],
    puntajes:{},
    fechaInicio:{type: Date},
    fechaFin:{type: Date, default: Date.now},
    respuesta:String
});



module.exports = mongoose.model('Conversacion', conversacionSchema);
//lowercase y pluralizar el nombre => topics se llamara la coleccion de datos en mongodb.
//topics => documentos (schema). 