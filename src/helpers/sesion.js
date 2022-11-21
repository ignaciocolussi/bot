const uuidv4 = require('../utils/uuid')
const modeloConversacion = require('../modelo/conversacion')

class sesionHelper {
    #clientes = new Map();
    
    nuevaSesion(ws, ip){
        let id = uuidv4();
        let fecha = Date.now();
        this.#clientes.set(ws, {id, ip, fecha})
        
    }

    getIp(){
        return this.#clientes.get(ws).ip;
    }

    getMetadata(ws) {
        return this.#clientes.get(ws);
    }

    setMensage(ws, msg){
        this.#clientes.set(ws, {...this.#clientes.get(ws), mensaje: msg})
    }

    getMensaje(ws){
        return this.#clientes.get(ws).mensaje;
    }

    setIntencion(ws, int){
        this.#clientes.set(ws, {...this.#clientes.get(ws), intencion: int})
    }

    getIntencion(ws){
        return this.#clientes.get(ws).intencion.intencionConMayorPuntaje.intencion;
    }

    getPuntajesIntenciones(ws){
        return this.#clientes.get(ws).intencion.puntajes;
    }

    setEntidades(ws, ent){
        this.#clientes.set(ws, {...this.#clientes.get(ws), entidades: ent})
    }

    getEntidades(ws){
        return this.#clientes.get(ws).entidades;
    }

    async cerrarSesion(ws){
        let conversacion = new modeloConversacion();
        conversacion.id = this.#clientes.get(ws).id;
        conversacion.ip = this.#clientes.get(ws).ip;
        conversacion.mensaje = this.#clientes.get(ws).mensaje;
        conversacion.intencion = this.#clientes.get(ws).intencion.intencionConMayorPuntaje.intencion;
        conversacion.entidades.push(this.#clientes.get(ws).mensaje.entidades);
        conversacion.puntajes = this.#clientes.get(ws).intencion.puntajes;
        conversacion.fechaInicio = this.#clientes.get(ws).fecha;
        await conversacion.save();
        console.debug(conversacion);
        this.#clientes.delete(ws);
    }
}

module.exports = sesionHelper;