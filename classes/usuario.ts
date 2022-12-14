
// Se usa en todas las secciones del curso
export class Usuario {

    public id: string;
    public nombre: string;
    public sala: string;

    constructor( id: string ) { 
        
        this.id = id;
        this.nombre = 'pending ...';
        this.sala   = 'No Room';

    }

}