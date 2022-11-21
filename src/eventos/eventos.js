const EventEmitter = require('events');
const controladoraSaludos = require ('../controladora/saludos'); 
const controladoraClima = require('../controladora/clima')

const emitter = new EventEmitter()


emitter.on('clima', (ws, sesionHelper) => {
   controladoraClima.clima(ws, sesionHelper)
  })

  emitter.on('tabla', (ws, sesionHelper) => {
    ws.send(`Recibido evento: ${sesionHelper.getIntencion(ws)} : id: ${sesionHelper.getMetadata(ws).id}`)
  })


  emitter.on('saludo', (ws, sesionHelper) => {
    controladoraSaludos.saludoInicial(ws, sesionHelper);
  })

  emitter.on('final', (ws, sesionHelper) => {
    controladoraSaludos.saludoFinal(ws, sesionHelper);
  })

  emitter.on('agradecimiento', (ws, sesionHelper) => {
    ws.send(`Recibido evento: ${sesionHelper.getIntencion(ws)} : id: ${sesionHelper.getMetadata(ws).id}`)
  })



  module.exports = {emitter};