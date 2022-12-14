import { Turno } from "./turno";

// Se usa en la última sección ejercicio de Colas
export class Turnos {
    private lista: Turno[] = [];

    constructor() {
    }

    asignarTurno(escritorio: number) {
        //console.log('Asignando Turno Escritorio ... ', escritorio)
        for (let i = 0; i < this.lista.length; i++ ) {
            if (this.lista[i].escritorio == null) {
                this.lista[i].escritorio = escritorio;
                return this.lista[i];
            }
        }

        return null;
    }

    crearTurno() {
        const turno = new Turno(this.lista.length +  1);
        this.lista.push(turno);
        return turno;
    }

    getTurnos() {
        return this.lista.filter(turno => turno.escritorio); // Solo turnos que tengan asignado escritorio
    }

    inicializarTurnos() {
        this.lista = [];
    }
}