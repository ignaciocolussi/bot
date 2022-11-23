
const responder = (ws, sesionHelper) => {
    sesionHelper.enviarMensaje(ws, `No hay por que! `)
}

module.exports = {
    responder
};