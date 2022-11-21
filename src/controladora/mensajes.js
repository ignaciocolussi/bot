const HelperIntenciones = require('../helpers/intenciones');
const HelperEntidades = require('../helpers/entidades');
const eventos = require('../eventos/eventos');

const intencionHelper = new HelperIntenciones();




const recibido = (mes, ws, sesionHelper) => {

    const message = JSON.parse(mes).string;
    sesionHelper.setMensage(ws, message)

    let resIntent = intencionHelper.obtenerIntencion(message);

    if (resIntent.intencionConMayorPuntaje.puntaje !== undefined) {
        sesionHelper.setIntencion(ws, resIntent);

        console.debug(sesionHelper.getMetadata(ws));

        eventos.emitter.emit(resIntent.intencionConMayorPuntaje.intencion, ws, sesionHelper);

        //ws.send(`Ejecutar para intencion: ${resIntent.intencionConMayorPuntaje.intencion} : id: ${sesionHelper.getMetadata(ws).id}`)

    } else {
        ws.send(`Lo siento, no he entendido tu mensaje. ${sesionHelper.getMetadata(ws).id}`)
    }
}


module.exports = { recibido }