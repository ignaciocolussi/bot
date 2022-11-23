const EventEmitter = require('events');
const controladoraSaludos = require('../controladora/saludos');
const controladoraAgradecimiento = require('../controladora/agradecimiento');
const controladoraClima = require('../controladora/clima')
const controladoraTablas = require('../controladora/tabla')
const controladoraCotizacion = require('../controladora/cotizacion')
const controladoraHorarios = require('../controladora/horarios')

const emitter = new EventEmitter()


emitter.on('clima', (ws) => {
  controladoraClima.clima(ws)
})

emitter.on('tabla', (ws) => {
  controladoraTablas.tabla(ws)
})

emitter.on('cotizacion', (ws) => {
  controladoraCotizacion.cotizacion(ws)
})

emitter.on('horarios', (ws) => {
  controladoraHorarios.obtenerFecha(ws)
})

emitter.on('saludo', (ws) => {
  controladoraSaludos.saludoInicial(ws);
})

emitter.on('final', (ws) => {
  controladoraSaludos.saludoFinal(ws);
})

emitter.on('agradecimiento', (ws) => {
  controladoraAgradecimiento.responder(ws);
})



module.exports = { emitter };