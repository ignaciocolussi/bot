const sesionHelper = require('../helpers/sesion');
const EntidadesHelper = require('../helpers/entidades');
const m3oHelper = require('../helpers/m3o');



const cotizacion = async (ws) => {
    let entidades = EntidadesHelper.obtenerMonedas(sesionHelper.getMensaje(ws));
    
    if(entidades){
    sesionHelper.setEntidades(ws, entidades)

    try {
        sesionHelper.enviarMensaje(ws, "🔍 Estoy buscando los datos!... ")
            let response = await m3oHelper.obtenerCotizacion(entidades)
      
         if(!response){
            sesionHelper.enviarMensaje(ws, `No encontre cotizaciones para ${entidades}`)
         }else{
            let res = `La cotizacion de ${entidades.toUpperCase()}: ${response.values[0].price} ${response.values[0].currency}`;
            sesionHelper.enviarMensaje(ws, res);
         }

        } catch (error) {
            console.debug(error)
            sesionHelper.enviarMensaje(ws, `Upss... ha habido un error al realizar la busqueda 😭`)
        }
    }

    if(!entidades){
        sesionHelper.enviarMensaje(ws, `¿Que moneda?`)
    }

}
module.exports = { cotizacion }