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
//const clients = new Map();


wss.on('connection', (ws, req) => {
    sesionHelper.nuevaSesion(ws, req.socket.remoteAddress);
    console.debug(sesionHelper.getMetadata(ws));
    ws.on('message', (mes) => {
        controladoraMensajes.recibido(mes, ws, sesionHelper)


    });

    //send immediatly a feedback to the incoming connection    
    ws.send(`Hola! ¿En qué puedo ayudarte? : id: ${sesionHelper.getMetadata(ws).id}`);

});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});