class EntidadesHelper {
    constructor() {
        this.entidades = require('../datos/entidades')
    }

    obtenerPais(req) {
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");

        return this.obtenerEntidad(newreq, this.entidades.paises)
    }

    obtenerCiudad(req) {
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");
        return this.obtenerEntidad(newreq, this.entidades.ciudades)
        }

    obtenerMonedas(req) {
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");
        return this.obtenerEntidad(newreq, this.entidades.monedas)
       
    }

    obtenerEntidad(busqueda, tipo){
        for (const palabra of busqueda) {

            for (const entidad of tipo) {


                let encontrada = (palabra == entidad) ? true : false;

                if (encontrada) {
                    return entidad;
                };

            }
        }
    }
}

module.exports = new EntidadesHelper();