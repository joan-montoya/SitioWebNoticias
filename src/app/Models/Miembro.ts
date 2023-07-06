


export class Miembro {
    usuario: {
      idUsuario: number;
    };
    grupo: {
        idGrupo: number;
      };
  
    constructor() {
      this.usuario = { idUsuario: 0 };
      this.grupo = { idGrupo: 0 };
    }
  }