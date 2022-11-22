var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tablaPos = Schema({
    club: String,
    jugados: Number,
    ganados: Number,
    empatados: Number,
    perdidos: Number,
    golesfavor: Number,
    golescontra: Number,
    diferenciapts: String,
    puntos: Number,
    pais:String
});

tablaPos.methods.toJSON = function (params) {
    var obj = this.toObject();
    delete obj._id;
    delete obj.pais;
    return obj;
}

module.exports = tablaPos;

//lowercase y pluralizar el nombre => topics se llamara la coleccion de datos en mongodb.
//topics => documentos (schema). 