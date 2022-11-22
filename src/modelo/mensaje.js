var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mensaje = Schema({
    origen: String,
    mensaje: String,
    intencion: String,
    entidades: [String],
    puntajes: {},
    fechaFin: { type: Date, default: Date.now },
});

module.exports = mensaje

