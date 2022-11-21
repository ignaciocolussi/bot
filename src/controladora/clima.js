const { response } = require('express');
const axios = require("axios");
const entidades = require('../helpers/entidades');
const EntidadesHelper = new entidades();

const clima = async (ws, sesionHelper) => {
    if(EntidadesHelper.obtenerCiudad(sesionHelper.getMensaje(ws))){
        let weather_id = 3838583;
        
       // ws.send('Se buscara el clima de la ciudad: ' + EntidadesHelper.obtenerCiudad(sesionHelper.getMensaje(ws)))
        await axios(`http://api.openweathermap.org/data/2.5/forecast?id=${weather_id}&appid={process.env.WEATHER_API_KEY}`)
        .then((response) => response.json)
        .then((data) => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
            console.log(process.env.WEATHER_API_KEY);
          });
        
    }else{
        ws.send('Se buscara el clima de la localizacion por IP')
    }


}
module.exports= { clima }