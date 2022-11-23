const uuidv4 = require('../utils/uuid')


class sesionHelper {
    #clientes = new Map();

    nuevaSesion(ws, ip) {
        let id = uuidv4();
        let fecha = Date.now();
        this.#clientes.set(ws, { id, ip, fecha })

    }

    getIP(ws) {
        return this.#clientes.get(ws).ip;
    }

    getMetadata(ws) {
        return this.#clientes.get(ws);
    }

    setMensage(ws, msg) {
        this.#clientes.set(ws, { ...this.#clientes.get(ws), mensaje: msg })
    }

    getMensaje(ws) {
        return this.#clientes.get(ws).mensaje;
    }

    setIntencion(ws, int) {
        if(int != 'saludo' && int != 'final' && int != 'agradecimiento'){
            this.#clientes.set(ws, { ...this.#clientes.get(ws), intencion: int })
        }
        
    }

    getIntencion(ws) {
        return this.#clientes.get(ws).intencion?.intencionConMayorPuntaje?.intencion;
    }

    getPuntajesIntenciones(ws) {
        return this.#clientes.get(ws).intencion.puntajes;
    }

    setEntidades(ws, ent) {
        this.#clientes.set(ws, { ...this.#clientes.get(ws), entidades: ent })
    }

    getEntidades(ws) {
        return this.#clientes.get(ws).entidades;
    }

    enviarMensaje(ws, mensaje, object){
        
        let data=JSON.stringify({"data":mensaje, "object": object});
        ws.send(data)
    }

    async cerrarSesion(ws) {
        this.#clientes.delete(ws);
        ws.close();
    }
}

module.exports = new sesionHelper();