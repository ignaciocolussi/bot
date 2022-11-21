class EntidadesHelper {
    constructor(){
        this.entidades = require('../datos/entidades')
    }

     obtenerPais(req){
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");
            
            for (const pais of this.entidades.paises){
              
                for(const palabra of newreq){
                   
                    
                    let encontrada = (palabra == pais.pais)? true : false;
                    
                    if(encontrada){
                        return pais.pais;
                    };

                }
            }
    }

    obtenerCiudad(req){
        let newreq = req.replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase().split(" ");
            
            for (const ciudad of this.entidades.ciudades){
              
                for(const palabra of newreq){
                   
                    
                    let encontrada = (palabra == ciudad.nombre)? true : false;
                    
                    if(encontrada){
                        return ciudad.nombre;
                    };

                }
            }
    }
}

module.exports = EntidadesHelper;