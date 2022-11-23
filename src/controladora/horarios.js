const sesionHelper = require('../helpers/sesion');
const EntidadesHelper = require('../helpers/entidades');
const m3o = require("m3o").default(process.env.M3O_TOKEN);



const obtenerFecha = async (ws) => {
    let entidades = EntidadesHelper.obtenerCiudad(sesionHelper.getMensaje(ws));
    
    if(entidades){
    sesionHelper.setEntidades(ws, entidades)
    
    // Obtener tabla desde mongoDB
    
    try {
        sesionHelper.enviarMensaje(ws, "🔍 Estoy buscando los datos!... ")

            let respuesta = await await m3o.time.zone({
            location: entidades,
            });
            
         if(!respuesta){
            sesionHelper.enviarMensaje(ws, `No encontre informacion para ${entidades}`)
         }else{
            let separado = respuesta.localtime.split(' ');
            
            let res = `En ${entidades.toUpperCase()} la hora es ${separado[1]} del ${separado[0].split('-').reverse().join('/')} (Huso horario: ${ respuesta.abbreviation})`;
            sesionHelper.enviarMensaje(ws, res);
         }
          } catch (error) {
            sesionHelper.enviarMensaje(ws, `Upss... ha habido un error al realizar la busqueda 😭`)
        }
    }

    if(!entidades){
        sesionHelper.enviarMensaje(ws, `¿Que ciudad?`)
    }

}
module.exports = { obtenerFecha }