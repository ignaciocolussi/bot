const HelperIntenciones = require('../helpers/intenciones');
const HelperEntidades = require('../helpers/entidades');
const eventos = require('../eventos/eventos');

const intencionHelper = new HelperIntenciones();




const recibido = (mes, ws, sesionHelper) => {
    
    const message = mes.message;
    if(!mes.message){
        sesionHelper.enviarMensaje(ws, `¿En que puedo ayudarte?`);
    }else{
        sesionHelper.setMensage(ws, message)

    let resIntent = intencionHelper.obtenerIntencion(message);
   

    if (resIntent.intencionConMayorPuntaje.puntaje !== undefined) {
        sesionHelper.setIntencion(ws, resIntent);

        
        eventos.emitter.emit(resIntent.intencionConMayorPuntaje.intencion, ws, sesionHelper);

        

    } else {
        if(sesionHelper.getIntencion(ws) !== undefined){
            
            eventos.emitter.emit(sesionHelper.getIntencion(ws), ws, sesionHelper);
        }else{
            
            sesionHelper.enviarMensaje(ws,`Lo siento, no he entendido tu mensaje.`)
        }
        
    }
    }
    
    
}


module.exports = { recibido }