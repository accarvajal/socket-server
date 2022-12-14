import ServerApp from './classes/server';
import router from './routes/router';
//import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';


const server = ServerApp.instance;

// BodyParser
//server.app.use( bodyParser.urlencoded({ extended: true }) );
//server.app.use( bodyParser.json() );

server.app.use( express.urlencoded() ); // Parse URL - encoded bodies
server.app.use( express.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true  }) );

// Rutas de servicios
server.app.use('/', router );

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});


