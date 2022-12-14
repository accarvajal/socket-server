// Se usa en la sección S8 del curso
export class EncuestaData {

    private labels: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { }

    setlabels(labels: string[]) {
        this.labels = labels;
    }

    getDataGrafica() {
        return [
            { data: this.valores , label: 'Pregunta'}
        ];
    }

    incrementarUnidades( opcion: number, valor: number ) {
        this.valores[opcion] += valor;
        return this.getDataGrafica();
    }

}