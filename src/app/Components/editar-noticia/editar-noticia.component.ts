import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias.service';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/Services/comentario.service';
import { ReaccionService } from 'src/app/Services/reaccion.service';
import { FavoritoService } from 'src/app/Services/favorito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {

  titulo = "";
  contenido = "";
  imagen = "";
  noticias: any;
  idCategoria: any;
  comentarios: any;
  mostrarComentarios = false;
  idnoticia = ""
  reacciones: any;
  favoritos: any;
  idNoticia: any;

  nuevoComentario: string = '';

  constructor(
    private NoticiasService: NoticiasService, 
    private ComentarioService: ComentarioService,
    private ReaccionService: ReaccionService,
    private FavoritoService: FavoritoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.idCategoria = localStorage.getItem('catIngresado');
    this.idNoticia = localStorage.getItem('idEditar');
    this.obtnerNoticias();
    this.ObtenerComentarios()
    this.obtenerReacciones()
    this.obtenerFavoritos()
  }


  obtnerNoticias() {
    //logica para la obtencion de noticias
    this.NoticiasService.obtenerNoticias()
    .subscribe(
      noticias => {
        //creamos un filtro donde solo tendremos los miembros (registros de miembros) que pertenecen al usuario registrado
        this.noticias = noticias.filter((noticia: any) => noticia.idNoticia == this.idNoticia);
        this.noticias = this.noticias.map((noticia: any) => {
          // Decodificar el valor de la imagen utilizando atob()
          noticia.imagen = atob(noticia.imagen);
      
          // Retornar un nuevo objeto con la propiedad 'imagen' modificada
          return noticia
        });
        console.log(this.noticias)
      },
    error => {
      console.error('Error al obtener miembros:', error);
      // Manejar el error
      }
    );
  }

  //metodo para publicar noticias
  editarNoticia() {
    // Crear objeto de noticia
    const imagenData = {
      titulo: this.noticias[0].titulo,
      contenido: this.noticias[0].contenido,
      imagen: btoa(this.imagen),
      grupo: {
        idGrupo: this.noticias[0].idGrupo
      },
      categoria: {
        idCategoria: this.noticias[0].idCategoria
      },
      administrador: {
        idUsuario: this.noticias[0].idUsuario
      }
    }

    // comprobamos que la imagen no esta vacia
      if (imagenData && imagenData.imagen !== '') {
        console.log('La imagen no está vacía.');
      } else {
        imagenData.imagen = btoa(this.noticias[0].imagen)
      }

    console.log(imagenData)
      //logica para la insercion de noticias
      this.NoticiasService.modificarNoticia(this.noticias[0].idNoticia,imagenData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Noticia editada con éxito',
          }).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error al editar la noticia:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al editar la noticia'+error,
          }).then(() => {
            window.location.reload();
          });
        }
      );

    }

  
  //obtencion de imagen y trnasformacion
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.readFile(file).then((base64: string) => {
      this.imagen = base64;
    });
  }
  //obtencion de imagen y trnasformacion
  readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  //obtencion de imagen y trnasformacion
  dataURLtoImage(dataURL: string): string {
    const image = new Image();
    image.src = 'data:image/jpeg;base64,' + dataURL; // Reemplaza 'image/jpeg' con el formato de imagen correcto si es diferente
  
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
  
    const context = canvas.getContext('2d');
    if (context !== null) {
      context.drawImage(image, 0, 0);
      return canvas.toDataURL(); // Devuelve el formato de imagen válido
    } else {
      throw new Error('El contexto del lienzo es nulo.');
    }
  }


  //metodos para ver y mostrar comentarios 
  toggleComentarios(idNoticia: any) {
    this.mostrarComentarios = !this.mostrarComentarios;
    this.idnoticia = idNoticia
  }

  //agregar comentarios
  agregarComentario(idNoticia: string) {
    //crear objeto comentario
    const comentarioData = {
      contenido: this.nuevoComentario,
      usuario: {
        idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10)
      },
      noticia: {
        idNoticia: idNoticia
      }
    }
    //logica para la insercion de comentarios
    this.ComentarioService.guardarComentario(comentarioData).subscribe(
      (response) => {
        console.log('Comentario insertado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Comentario añadido con éxito',
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error al insertar el grupo:', error);
        // Lógica de manejo de errores
      }
    );
  }

  //logica para obtener comentarios
  ObtenerComentarios() {
    this.ComentarioService.obtenerComentarios().subscribe(
        (response) => {
          this.comentarios = response //.filter((comentario: any) => comentario.idNoticia === idNoticia)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  //logica para obtener reacciones
  obtenerReacciones() {
    this.ReaccionService.obtenerReacciones().subscribe(
        (response) => {
          this.reacciones = response 
        },
        (error) => {
          console.log(error)
        }
      )
  }

  //logica para eliminar reacciones
  eliminarReaccion(idReaccion: any) {
    this.ReaccionService.eliminarReaccion(idReaccion).subscribe(
        (response) => {
          location.reload()
        },
        (error) => {
          console.log(error)
        }
      )
  }

  //insercion de reacciones
  crearReaccion (idNoticia: any) {
    //crear objeto reaccion
    const reaccionData = {
     tipoReaccion: "me gusta",
     usuario: {
       idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10)
     },
     noticia: {
       idNoticia: idNoticia
     }
   }
   //logica para la insercion de reacciones
   this.ReaccionService.guardarReaccion(reaccionData).subscribe(
     (response) => {
       location.reload()
     },
     (error) => {
       console.error('Error al insertar el grupo:', error);
       // Lógica de manejo de errores
     }
   );
 }

  //obtencion de reacciones por idNoticia y idsuario
  verificarReaccion(idNoticia: number): number | false {
    const idUsuario = localStorage.getItem('idUsuario');
  
    if (this.reacciones && this.reacciones.length > 0) {
      const reaccionEncontrada = this.reacciones.find((reaccion: any) => reaccion.idUsuario == idUsuario && reaccion.idNoticia === idNoticia);
      if (reaccionEncontrada) {
        return reaccionEncontrada.idReaccion; // Devuelve el ID de la reacción encontrada
      }
    }
    return false; // No se encontró ninguna reacción o la variable this.reacciones no está definida
  }
  

  //logica para obtener favoritos
  obtenerFavoritos() {
    this.FavoritoService.obtenerFavoritos().subscribe(
        (response) => {
          this.favoritos = response 
        },
        (error) => {
          console.log(error)
        }
      )
  }

  //obtencion de favoritos por idNoticia y idsuario
  verificarFavorito(idNoticia: number): number | false {
    const idUsuario = localStorage.getItem('idUsuario');
  
    if (this.favoritos && this.favoritos.length > 0) {
      const favoritoEncontrado = this.favoritos.find((favorito: any) => favorito.idUsuario == idUsuario && favorito.idNoticia === idNoticia);
      if (favoritoEncontrado) {
        return favoritoEncontrado.idFavorito; // Devuelve el ID del favorito encontrado
      }
    }
    return false; // No se encontró ningún favorito o la variable this.favoritos no está definida
  }
  
  //insercion de reacciones
  crearFavorito (idNoticia: any) {
    //crear objeto reaccion
    const favoritoData = {
     usuario: {
       idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10)
     },
     noticia: {
       idNoticia: idNoticia
     }
   }
   //logica para la insercion de reacciones
   this.FavoritoService.guardarFavorito(favoritoData).subscribe(
     (response) => {
       location.reload()
     },
     (error) => {
       console.error('Error al insertar el favorito:', error);
       // Lógica de manejo de errores
     }
   );
 }

 //logica para eliminar favoritos
 eliminarFavorito(idFavorito: any) {
  this.FavoritoService.eliminarFavorito(idFavorito).subscribe(
      (response) => {
        location.reload()
      },
      (error) => {
        console.log(error)
      }
    )
  }

   // Función para obtener la cantidad de reacciones por idNoticia
getCantidadReacciones(idNoticia: number): number {
  // Filtrar las reacciones solo para la noticia actual (idNoticia)
  const reaccionesFiltradas = this.reacciones.filter((reaccion: any) => reaccion.idNoticia === idNoticia);

  // Devolvemos la cantidad de reacciones para esa noticia.
  return reaccionesFiltradas.length;
}

}
