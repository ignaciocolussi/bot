require('dotenv').config()
//require('./mongo')

var express = require('express');
const http = require('http')
const WebSocket = require('ws');
const uuidv4 = require('./utils/uuid')
const HelperIntenciones = require('./helpers/intenciones');
const HelperEntidades = require('./helpers/entidades');

const intencionHelper = new HelperIntenciones();
const entidadesHelper = new HelperEntidades();

// Ejecutar Express
var app = express();


//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const clients = new Map();


wss.on('connection', (ws, req) => {
    const id = uuidv4();
    clients.set(ws, {id});
    //connection is up, let's add a simple simple event
    ws.on('message', (mes) => {
        const message = JSON.parse(mes).string;
        const metadata = clients.get(ws);
        //log the received message and send it back to the client
        console.debug(metadata);
       
        let resIntent = intencionHelper.obtenerIntencion(message);

        if(resIntent.intencionConMayorPuntaje.puntaje !== undefined){
            ws.send(`Ejecutar para intencion: ${resIntent.intencionConMayorPuntaje.intencion}`)
        }else{
            ws.send(`Lo siento, no he entendido tu mensaje. ${metadata.id}` )  
        }
        
        
        
    });

    //send immediatly a feedback to the incoming connection    
    ws.send(`Hola! ¿En qué puedo ayudarte? : id: ${id}`);

});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});