export class Noticia {
    titulo: string;
      contenido: string;
      imagen: string;
      grupo: {
        idGrupo: number
      };
      categoria: {
        idCategoria: number
      };
      administrador: {
        idUsuario: number
      };

      constructor() {
        this.titulo = '';
        this.contenido = '';
        this.imagen = '';
        this.grupo = { idGrupo: 0 };
        this.categoria = { idCategoria: 0 };
        this.administrador = { idUsuario: 0 };
      }
}