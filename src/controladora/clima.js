const sesionHelper = require('../helpers/sesion');
const EntidadesHelper = require('../helpers/entidades');
const AccuWeatherHelper = require('../helpers/accuweather');

const clima = async (ws) => {
    let ciudad = EntidadesHelper.obtenerCiudad(sesionHelper.getMensaje(ws));
    
    if (ciudad) {
        // Se buscara el clima por ciudad;
        try {
            console.log(`Buscar clima de ${ciudad}`);
            let clima = await AccuWeatherHelper.obtenerClimaPorLocalidad(ciudad);
            sesionHelper.enviarMensaje(ws, clima) 
        } catch (error) {
            sesionHelper.enviarMensaje(ws, `Upss... Ha habido un error al obtener los datos.. 😭`)
        }

    } else {
        //Se buscara el clima de la localizacion por IP
        
        try {
            console.debug(sesionHelper.getIP(ws));
            let clima = await AccuWeatherHelper.obtenerClimaPorIP(sesionHelper.getIP(ws));
            sesionHelper.enviarMensaje(ws, clima);
        } catch (error) {
            sesionHelper.enviarMensaje(ws, `Upss... Ha habido un error al obtener los datos.. 😭`)
        }
    }


}
module.exports = { clima }