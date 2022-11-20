class EntidadesHelper {
    constructor(){
        this.entidades = require('../datos/entidades')
    }

     obtenerPais(req){
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').split(" ");
        
            for (const pais of paises){
              console.log(pais.nombre);
                for(const palabra of newreq){
                    let palabraSinGenero = palabra.slice(0, -1)
                    let encontrada = (palabra == pais.pais || pais.nacionalidad.includes(palabraSinGenero))? true : false;
                    if(encontrada){
                        return pais.nombre;
                    };

                }
            }
    }
}

module.exports = EntidadesHelper;