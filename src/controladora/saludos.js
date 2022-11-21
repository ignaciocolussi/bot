

const saludoInicial = (ws, sesionHelper) => {
    ws.send(`🤓 Hola! Estoy a tu disposicion! ¿Que consulta tienes?`)
}

const saludoFinal = (ws, sesionHelper) =>{
    ws.send(`Ha sido un gusto ayudarte. Hasta luego! 👋`)
    sesionHelper.cerrarSesion(ws);
}

module.exports ={
    saludoInicial,
    saludoFinal
};