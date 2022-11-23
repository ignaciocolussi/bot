const sesionHelper = require('../helpers/sesion');
const eventos = require('../eventos/eventos');

const intencionHelper = require('../helpers/intenciones');

const recibido = (mes, ws) => {
    
    const mensaje = mes.message;
    if(!mes.message){
        sesionHelper.enviarMensaje(ws, `¿En que puedo ayudarte?`);
    }else{
        sesionHelper.setMensage(ws, mensaje)

    let resIntent = intencionHelper.obtenerIntencion(mensaje);
        console.debug(resIntent);

    if (resIntent.intencionConMayorPuntaje.puntaje !== undefined) {
        sesionHelper.setIntencion(ws, resIntent);
        eventos.emitter.emit(resIntent.intencionConMayorPuntaje.intencion, ws);
    } else {
        if(sesionHelper.getIntencion(ws) !== undefined){   
            eventos.emitter.emit(sesionHelper.getIntencion(ws), ws);
        }else{
            sesionHelper.enviarMensaje(ws,`Lo siento, no he entendido tu mensaje.`)
        }
        
    }
    }
    
    
}


module.exports = { recibido }