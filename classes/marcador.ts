// Se usa en la sección S9 del curso
export class Marcador {
    constructor(
        public id: string,
        public nombre: string,
        public lng: number,
        public lat: number,
        public color?: string
    ) {}   
}