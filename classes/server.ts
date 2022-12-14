import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { Server } from 'socket.io';
import { createServer } from 'http';

import * as socket from '../sockets/socket';

export default class ServerApp {

    private static _intance: ServerApp;

    public app: express.Application;
    public port: number;

    public io: Server;
    private httpServer: any;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = createServer( this.app );
        this.io = new Server( this.httpServer, { 
            cors: { 
                //origin: "http://localhost:4200",
                origin: true, 
                credentials: true  
            },
        } );

        this.listenSockets();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }

    private listenSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // Después de Conectar cliente
            socket.afterClientConnection( cliente );

            // Escuchar eventos de usuarios
            socket.listenForUsuarios( cliente, this.io );

            // Escuchar eventos de mapas
            socket.listenForMapas( cliente );

            socket.listenForTurnos( cliente );

            // Escuchar eventos de Mensajes generales
            socket.listenForMensajes( cliente );

            // Escuchar eventos de Desconectar
            socket.listenForDesconectar( cliente );          

        });

    }

    start( callback: Function ) {

        this.httpServer.listen( this.port, callback );

    }

}