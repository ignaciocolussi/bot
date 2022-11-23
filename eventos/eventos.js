const EventEmitter = require('events');
const controladoraSaludos = require('../src/controladora/saludos');
const controladoraAgradecimiento = require('../src/controladora/agradecimiento');
const controladoraClima = require('../src/controladora/clima')
const controladoraTablas = require('../src/controladora/tabla')
const controladoraCotizacion = require('../src/controladora/cotizacion')
const controladoraHorarios = require('../src/controladora/horarios')

const emitter = new EventEmitter()


emitter.on('clima', (ws, sesionHelper) => {
  controladoraClima.clima(ws, sesionHelper)
})

emitter.on('tabla', (ws, sesionHelper) => {
  controladoraTablas.tabla(ws, sesionHelper)
})

emitter.on('cotizacion', (ws, sesionHelper) => {
  controladoraCotizacion.cotizacion(ws, sesionHelper)
})

emitter.on('horarios', (ws, sesionHelper) => {
  controladoraHorarios.obtenerFecha(ws, sesionHelper)
})

emitter.on('saludo', (ws, sesionHelper) => {
  controladoraSaludos.saludoInicial(ws, sesionHelper);
})

emitter.on('final', (ws, sesionHelper) => {
  controladoraSaludos.saludoFinal(ws, sesionHelper);
})

emitter.on('agradecimiento', (ws, sesionHelper) => {
  controladoraAgradecimiento.responder(ws, sesionHelper);
})



module.exports = { emitter };