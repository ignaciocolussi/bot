const sesionHelper = require('../helpers/sesion');

const responder = (ws) => {
    sesionHelper.enviarMensaje(ws, `No hay por que! `)
}

module.exports = {
    responder
};