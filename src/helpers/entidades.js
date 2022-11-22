class EntidadesHelper {
    constructor() {
        this.entidades = require('../datos/entidades')
    }

    obtenerPais(req) {
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");

        for (const pais of this.entidades.paises) {

            for (const palabra of newreq) {


                let encontrada = (palabra == pais.pais) ? true : false;

                if (encontrada) {
                    return pais.pais;
                };

            }
        }
    }

    obtenerCiudad(req) {
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");

        for (const ciudad of this.entidades.ciudades) {

            for (const palabra of newreq) {


                let encontrada = (palabra == ciudad.nombre) ? true : false;

                if (encontrada) {
                    return ciudad.nombre;
                };

            }
        }
    }

    obtenerMonedas(req) {
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");

        for (const palabra of newreq) {

            for (const moneda of this.entidades.monedas) {


                let encontrada = (palabra == moneda) ? true : false;

                if (encontrada) {
                    return moneda;
                };

            }
        }
    }
}

module.exports = EntidadesHelper;