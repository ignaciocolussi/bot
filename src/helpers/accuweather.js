const axios = require("axios")

class AccuWeatherHelper {
    #api_key;
    constructor() {
        this.#api_key = process.env.ACCUWEATHER_API_KEY
    }

    async obtenerClimaPorLocalidad(localidad) {
        // Primero debemos tener el codigo de localidad. Lo buscamos 
        let params = {
            apikey: this.#api_key,
            language: 'es-es',
            q: localidad
        }
        
        let clima = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/search', { params }).catch((err) => console.error(err));
        
        let id = clima.data[0].Key
        
        // Ahora obtengo el clima 
        let response = await this.clima(id);
        
        return response;

    }

    async obtenerClimaPorIP(ip) {
        // Primero debemos tener el codigo de localidad. Lo buscamos 
        let params = {
            apikey: this.#api_key,
            language: 'es-es',
            q: ip
        }

        let clima = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/ipaddress', { params });
        let id = clima.data.Key

        // Ahora obtengo el clima 
        let response = await this.clima(id);
        
        return response;

    }

    async clima(id) {
        // Ahora obtengo el clima de la ciudad
        const params = {
            apikey: this.#api_key,
            language: 'es-es',
            metric: true
        }
        let data = await axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + id, { params })
        
        const forecast = data.data.DailyForecasts[0];
        //console.debug(forecast);
        return (`Hoy estara ${forecast.Day.IconPhrase}. Con temperaturas minimas de ${forecast.Temperature.Minimum.Value} ° C y maximas de ${forecast.Temperature.Maximum.Value} ° C. `)


    }
}

module.exports = AccuWeatherHelper;