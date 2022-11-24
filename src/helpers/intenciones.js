

class intencionesHelper {
    constructor() {
        this.palabras = require('../datos/palabras');
        this.intenciones = require('../datos/intenciones');
    }

    obtenerIntencion(req) {
        let newreq = req.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(" ")
        
        let puntajes = []
        let intencionConMayorPuntaje = {}

        for (const categoria in this.intenciones) {
            let puntaje = 0;
            for (const palabra of newreq) {
                let encontrada = this.intenciones[categoria].find(el => el === palabra)
                if (encontrada) {
                    puntaje += 1 / (this.palabras[palabra]);
                };

            }
            if (puntaje > 0 && (intencionConMayorPuntaje.puntaje == undefined || intencionConMayorPuntaje.puntaje < puntaje)) {

                intencionConMayorPuntaje.intencion = categoria;
                intencionConMayorPuntaje.puntaje = puntaje;
            }
            puntajes.push({ "intencion": categoria, "puntaje": puntaje });
        }
        return { intencionConMayorPuntaje, puntajes }
    }
}

module.exports = new intencionesHelper();