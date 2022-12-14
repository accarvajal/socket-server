// Se usa en la última sección ejercicio de Colas
export class Escritorios {
    private lista: number[] = [];

    asignar(escritorio: number) {
        for (const esc of this.lista) {
            if (esc == escritorio) {
                return false;
            }
        }

        this.lista.push(escritorio);
        //console.log("Lista: ", this.lista);
        return true;
    }

    desasignar(escritorio: number) {
        for (let i=0; i < this.lista.length; i++) {
            if (this.lista[i] == escritorio) {
                this.lista.splice(i, 1);
                //console.log("Lista: ", this.lista);
                return;
            }
        }
    }
}