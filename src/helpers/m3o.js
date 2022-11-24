const axios = require("axios")
const m3o = require("m3o").default(process.env.M3O_TOKEN);

class m3oHelper {
             #m3o
    constructor() {
        this.#m3o = m3o;
    }

    async obtenerCotizacion(moneda) {
        // Primero debemos tener el codigo de localidad. Lo buscamos 
        let response = await m3o.price.get({
            currency: 'USD',
            name: moneda
          });
        
        return response;

    }

    async obtenerFechaHora(ciudad) {
        // Primero debemos tener el codigo de localidad. Lo buscamos 
        let respuesta =  await m3o.time.zone({
            location: ciudad,
            });

        let separado = respuesta.localtime.split(' ');
        return {'hora': separado[1], 'fecha': separado[0].split('-').reverse().join('/'), 'husoHorario': respuesta.abbreviation }
        

    }

    
}

module.exports = new m3oHelper();