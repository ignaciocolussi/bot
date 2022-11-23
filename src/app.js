require('dotenv').config()
//require('./mongo')

var express = require('express');
const http = require('http')
const WebSocket = require('ws');

const sesionHelper = require('./helpers/sesion');

const controladoraMensajes = require('./controladora/mensajes');

// Ejecutar Express
var app = express();

//Inicializar el servidor
const server = http.createServer(app);

//Inicializar la instacia de websocket
const wss = new WebSocket.Server({ server });


// eventos del websocket
wss.on('connection', (ws, req) => {
    sesionHelper.nuevaSesion(ws, req.socket.remoteAddress.replace('::ffff:', ''));

    ws.on('message', (data) => {
        controladoraMensajes.recibido(JSON.parse(data), ws)
    });

    let res = '🤓 Hola! ¿En qué puedo ayudarte?';
    sesionHelper.enviarMensaje(ws, res)

});

app.get("/ping", (req, res) => {
    res.status(200).send('Ok');
});


server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor iniciado en puerto ${server.address().port} :)`);
});