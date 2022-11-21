const { response } = require('express');
const axios = require("axios");
const entidades = require('../helpers/entidades');
const accuweather = require('../helpers/accuweather');
const EntidadesHelper = new entidades();
const AccuWeatherHelper = new accuweather();

const clima = async (ws, sesionHelper) => {
    let ciudad = EntidadesHelper.obtenerCiudad(sesionHelper.getMensaje(ws));
    
    if (ciudad) {
        // Se buscara el clima por ciudad;
        try {

            let clima = await AccuWeatherHelper.obtenerClimaPorLocalidad(ciudad);
            console.debug(clima);
            ws.send(clima);

        } catch (error) {
            ws.send(`Upss... Ha habido un error al obtener los datos.. 😭`)
        }

    } else {
        //Se buscara el clima de la localizacion por IP
        console.log('Se buscara el clima de la localizacion por IP')
        try {
            let ip = '142.251.133.14';
            let clima = await AccuWeatherHelper.obtenerClimaPorIP(ip);
            console.debug(clima);
            ws.send(clima);

        } catch (error) {
            ws.send(`Upss... Ha habido un error al obtener los datos.. 😭`)
        }
    }


}
module.exports = { clima }