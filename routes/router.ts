
import { Router, Request, Response } from 'express';

import ServerApp from '../classes/server';
import { usuariosConectados, mapa, turnos } from '../sockets/socket';

import { EncuestaData } from '../classes/encuesta';
import { Escritorios } from '../classes/escritorios';
import { GraficaData } from '../classes/grafica';

const router = Router();
const grafica = new GraficaData();
const encuesta = new EncuestaData();
const escritorios = new Escritorios();

router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = { cuerpo, de };

    const server = ServerApp.instance;
    server.io.emit('mensaje-publico', payload );

    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = ServerApp.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (  req: Request, res: Response ) => {

    const server = ServerApp.instance;

    server.io.fetchSockets().then((sockets) => { 

        // otra forma de obtener los clientes
        //const clientes: Object[] = [];
        //sockets.forEach(socket => clientes.push(socket.id));

        res.json({
            ok: true,
            // clientes
            clientes: sockets.map( cliente => cliente.id )
        });
    }).catch(error => {
        return res.json({
            ok: false,
            error
        })
    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
    
});


router.get('/grafica', ( req: Request, res: Response  ) => {

    res.json( grafica.getDataGrafica() );

});

router.post('/grafica', ( req: Request, res: Response  ) => {

    const mes      = req.body.mes;
    const unidades = Number( req.body.unidades );

    grafica.incrementarValor( mes, unidades );

    const server = ServerApp.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica() );

    res.json( grafica.getDataGrafica() );

});


router.get('/encuesta', ( req: Request, res: Response  ) => {

    res.json( encuesta.getDataGrafica() );

});

router.post('/encuesta', ( req: Request, res: Response  ) => {

    const opcion   = Number(req.body.opcion);
    const unidades = Number( req.body.unidades );

    encuesta.incrementarUnidades( opcion, unidades );

    const server = ServerApp.instance;
    server.io.emit('cambio-grafica', encuesta.getDataGrafica() );

    res.json( encuesta.getDataGrafica() );

});

router.get('/mapa', ( req: Request, res: Response  ) => {

    res.json( mapa.getMarcadores() );

});

router.get('/turno', ( req: Request, res: Response  ) => {

    res.json( turnos.crearTurno() );

});

router.post('/asignar-escritorio', ( req: Request, res: Response  ) => {

    const escritorio: number = req.body.escritorio;
    if (escritorios.asignar(escritorio)) {
        res.json( "OK" );
    }
    else {
        res.json( "FAILED" );
    }

});

router.post('/desasignar-escritorio', ( req: Request, res: Response  ) => {

    const escritorio: number = req.body.escritorio;
    escritorios.desasignar(escritorio);
    res.json( "OK" );

});

router.get('/inicializar-turnos', ( req: Request, res: Response  ) => {

    turnos.inicializarTurnos();
    const server = ServerApp.instance;
    server.io.emit('lista-turnos', turnos.getTurnos() );
    res.json( "OK" );

});


export default router;