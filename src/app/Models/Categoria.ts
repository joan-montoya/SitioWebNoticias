export class Categoria {
    [x: string]: any;
    nombreCategoria: string;
    grupo: {
        idGrupo: number;
    };
  
    constructor() {
      this.nombreCategoria = '';
      this.grupo = { idGrupo: 0 };
    }
  }
  