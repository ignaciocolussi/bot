const mongoose = require("mongoose");


class tablaPosicionesHelper {
    #db_uri;
    #connection;
    constructor() {
        this.#db_uri = process.env.MONGO_DB_TABLASPOS

    }

    async inicializardDB(){
        this.#connection = mongoose.createConnection(this.#db_uri);
        return this.#connection.model('Tabla', require('../modelo/tablaPosiciones'));
    } 
    
    async obtenerTabla(pais){
        let con = await this.inicializardDB();
        if(pais === undefined){
            throw new Error('El pais esta vacio')
        }
        let tabla = await con.find(
            {"pais":pais})
        
        return tabla
        
    }
}

module.exports = new tablaPosicionesHelper();