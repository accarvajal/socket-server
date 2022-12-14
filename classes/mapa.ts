import { Marcador } from "./marcador";

// Se usa en la sección S9 del curso
export class Mapa {
    // Object declaration with Index Signature Syntax, useful to 
    // use index search by id instead of using loops
    private marcadores: { [key: string]: Marcador } = {}

    constructor() {}

    getMarcadores() {
        return this.marcadores;
    }

    agregarMarcador( marcador: Marcador ) {
        this.marcadores[ marcador.id ] = marcador;
        //console.log(marcador);
    }

    eliminarMarcador( id: string ) {
        delete this.marcadores[id];
        return this.getMarcadores()
    }

    moverMarcador( marcador: Marcador ) {
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    }
}