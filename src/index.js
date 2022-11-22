require('dotenv').config()
//require('./mongo')

var express = require('express');
const http = require('http')
const WebSocket = require('ws');
const HelperSesion = require('./helpers/sesion')
const mongo = require('./mongo');
const sesionHelper = new HelperSesion();

const controladoraMensajes = require('./controladora/mensajes');

// Ejecutar Express
var app = express();


//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });



wss.on('connection', (ws, req) => {
    sesionHelper.nuevaSesion(ws, req.socket.remoteAddress);
    

    ws.on('message', (data) => {
        
        controladoraMensajes.recibido(JSON.parse(data), ws, sesionHelper)


    });
    let res = '🤓 Hola! ¿En qué puedo ayudarte?';

    sesionHelper.enviarMensaje(ws, res) 

});



server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});