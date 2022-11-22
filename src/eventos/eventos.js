const EventEmitter = require('events');
const controladoraSaludos = require('../controladora/saludos');
const controladoraAgradecimiento = require('../controladora/agradecimiento');
const controladoraClima = require('../controladora/clima')
const controladoraTablas = require('../controladora/tabla')
const controladoraCotizacion = require('../controladora/cotizacion')
const controladoraHorarios = require('../controladora/horarios')

const emitter = new EventEmitter()


emitter.on('clima', (ws, sesionHelper) => {
  controladoraClima.clima(ws, sesionHelper)
})

emitter.on('tabla', (ws, sesionHelper) => {
  controladoraTablas.tabla(ws, sesionHelper)
  //ws.send(`Recibido evento: ${sesionHelper.getIntencion(ws)} : id: ${sesionHelper.getMetadata(ws).id}`)
})

emitter.on('cotizacion', (ws, sesionHelper) => {
  controladoraCotizacion.cotizacion(ws, sesionHelper)
  //ws.send(`Recibido evento: ${sesionHelper.getIntencion(ws)} : id: ${sesionHelper.getMetadata(ws).id}`)
})

emitter.on('horarios', (ws, sesionHelper) => {
  controladoraHorarios.obtenerFecha(ws, sesionHelper)
  //ws.send(`Recibido evento: ${sesionHelper.getIntencion(ws)} : id: ${sesionHelper.getMetadata(ws).id}`)
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