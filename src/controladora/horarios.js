const sesionHelper = require('../helpers/sesion');
const EntidadesHelper = require('../helpers/entidades');
const m3oHelper = require('../helpers/m3o');



const obtenerFecha = async (ws) => {
    let entidades = EntidadesHelper.obtenerCiudad(sesionHelper.getMensaje(ws));
    
    if(entidades){
    sesionHelper.setEntidades(ws, entidades)
    
    // Obtener tabla desde mongoDB
    
    try {
        sesionHelper.enviarMensaje(ws, "🔍 Estoy buscando los datos!... ")

            let respuesta = await m3oHelper.obtenerFechaHora(entidades);
            
         if(!respuesta){
            sesionHelper.enviarMensaje(ws, `No encontre informacion para ${entidades}`)
         }else{
                       
            let res = `En ${entidades.toUpperCase()} la hora es ${respuesta.hora} del ${respuesta.fecha} (Huso horario: ${ respuesta.husoHorario})`;
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