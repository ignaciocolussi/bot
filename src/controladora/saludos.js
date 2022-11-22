

const saludoInicial = (ws, sesionHelper) => {
    sesionHelper.enviarMensaje(ws, `🤓 Hola! Estoy a tu disposicion! ¿Que consulta tienes?`)
}

const saludoFinal = (ws, sesionHelper) => {
    sesionHelper.enviarMensaje(ws, `Ha sido un gusto ayudarte. Hasta luego! 👋`)
    sesionHelper.cerrarSesion(ws);
}

module.exports = {
    saludoInicial,
    saludoFinal
};