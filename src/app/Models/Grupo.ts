export class Grupo {
    descripcion: string;
    codigoAcceso: string;
    nombre: string;
    administrador: {
      idUsuario: number;
    };
    imagen: string;
  
    constructor() {
      this.descripcion = '';
      this.codigoAcceso = '';
      this.nombre = '';
      this.administrador = { idUsuario: 0 };
      this.imagen = '';
    }
  }
  