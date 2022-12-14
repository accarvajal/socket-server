import { Socket } from 'socket.io';
import socketIO from 'socket.io';

import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
import { Turnos } from '../classes/turnos';
import { Usuario } from '../classes/usuario';
import { Usuarios } from '../classes/usuarios';

export const usuariosConectados = new Usuarios();
export const mapa = new Mapa();
export const turnos = new Turnos();

// Se usa en todas las secciones del curso
export const afterClientConnection = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

// Se usa en todas las secciones del curso
export const listenForDesconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario( cliente.id );

        cliente.broadcast.emit('usuarios-activos', usuariosConectados.getLista()  );

    });

}

// Escuchar mensajes generales - Se usa en todas las secciones del curso
export const listenForMensajes = ( cliente: Socket ) => {

    cliente.on('mensaje', (  payload: { origin: string, body: string }  ) => {

        cliente.broadcast.emit('mensaje-publico', payload );

    });

}

// Escuchar mensajes de usuarios - Se usa en todas las secciones del curso
export const listenForUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('actualizar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        cliente.broadcast.emit('usuarios-activos', usuariosConectados.getLista()  );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

    cliente.on('consultar-usuarios', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista()  );
        
    });

}

// Escuchar mensajes de mapas - Se usa en la sección S9 del curso
export const listenForMapas = ( cliente: Socket ) => {

    cliente.on('nuevo-marcador', (  marcador: Marcador  ) => {

        mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('nuevo-marcador', marcador );

    });

    cliente.on('elimina-marcador', ( id: string ) => {

        mapa.eliminarMarcador(id);
        cliente.broadcast.emit('elimina-marcador', id );
        
    });

    cliente.on('reposiciona-marcador', (  marcador: Marcador  ) => {

        mapa.agregarMarcador(marcador);
        console.log("Reposiciona: ", marcador);
        cliente.broadcast.emit('reposiciona-marcador', marcador );

    });

}


// Escuchar mensajes de turnos - Se usa en la última sección S11 - Colas, del curso
export const listenForTurnos = ( cliente: Socket ) => {

    cliente.on('asignar-turno', ( escritorio: number ) => {

        const turno = turnos.asignarTurno(escritorio);
        cliente.emit('turno-asignado', turno );

    });

    cliente.on('lista-turnos', () => {

        //console.log('lista de turnos ...', turnos.getTurnos());
        cliente.emit('lista-turnos', turnos.getTurnos() );
        cliente.broadcast.emit('lista-turnos', turnos.getTurnos() );
        
    });

}