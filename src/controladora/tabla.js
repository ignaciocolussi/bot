const sesionHelper = require('../helpers/sesion');
const EntidadesHelper = require('../helpers/entidades');
const TablaPosicionesHelper = require('../helpers/tablaPosiciones');

const tabla = async (ws) => {
    let entidades = EntidadesHelper.obtenerPais(sesionHelper.getMensaje(ws));
    
    if(entidades){
    sesionHelper.setEntidades(ws, entidades)
    
    // Obtener tabla desde mongoDB
    
    try {
        sesionHelper.enviarMensaje(ws, "🔍 Estoy buscando los datos!... ")
         let tabla = await TablaPosicionesHelper.obtenerTabla(entidades);
         if(!tabla || tabla[0] == undefined){
            sesionHelper.enviarMensaje(ws, `No hay resultados cargados de ${entidades}`)
         }else{
            let res = `Aqui estan los resultados`;
            let cabecera = {0:"Club", 1:"J", 2:"G", 3:"E", 4:"P",5:"GF", 6:"GC", 7:"DIF", 8:"Puntos"}
            tabla.unshift(cabecera);
            sesionHelper.enviarMensaje(ws, res);
            sesionHelper.enviarMensaje(ws, null, tabla);
         }
        } catch (error) {
            console.debug(error)
            sesionHelper.enviarMensaje(ws, `Upss... ha habido un error al realizar la busqueda 😭`)
        }
    }
    if(!entidades){
        sesionHelper.enviarMensaje(ws, `Perfecto. ¿De que pais?`)
    }

}
module.exports = { tabla }