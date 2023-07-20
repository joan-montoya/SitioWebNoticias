import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias.service';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/Services/comentario.service';
import { ReaccionService } from 'src/app/Services/reaccion.service';
import { FavoritoService } from 'src/app/Services/favorito.service';

@Component({
  selector: 'app-mis-favoritos',
  templateUrl: './mis-favoritos.component.html',
  styleUrls: ['./mis-favoritos.component.css']
})
export class MisFavoritosComponent implements OnInit {

  noticias: any;
  idCategoria: any;
  nombreCat: any;

  titulo = "";
  contenido = "";
  imagen = "";
  comentarios: any;
  mostrarComentarios = false;
  idnoticia = ""
  reacciones: any;
  favoritos: any
  idUsuario: any;

  nuevoComentario: string = '';

  constructor(
    private NoticiasService: NoticiasService, 
    private ComentarioService: ComentarioService,
    private ReaccionService: ReaccionService,
    private FavoritoService: FavoritoService
    ) { }

  ngOnInit(): void {
    this.idCategoria = localStorage.getItem('catIngresado');
    this.nombreCat = localStorage.getItem('nombreCat');
    this.idUsuario = localStorage.getItem('idUsuario');
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
        this.noticias = noticias
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
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Comentario añadido con éxito',
        // });
        location.reload()
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
      
      this.comentarios = response.sort((a: any, b: any) => a.idComentario - b.idComentario);
      console.log(this.comentarios);
    },
    (error) => {
      console.log(error);
    }
  );
  
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

  //obtencion de favoritos por idNoticia y idsuario
  verificarNoticia(idNoticia: number): number | false {
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

//logica para eliminar comentarios
eliminarComentario(idComentario: any) {
  this.ComentarioService.eliminarComentario(idComentario).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Comentario eliminado con éxito',
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.log(error)
      }
    )
}

//logica para modificar comentarios
editarComentario(idComentario: any, idNoticia: any) {
    Swal.fire({
      title: 'modificar comentario',
      text: 'Ingrese el nuevo contenido del comentario:',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const value: string = result.value;
        //creacion de json para la insercion
        const comentarioData = {
          contenido: value,
          usuario: {
            idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10)
          },
          noticia: {
            idNoticia: idNoticia
          }
        }
        //logica de modificacion de categoria
        console.log(comentarioData)
        this.ComentarioService.modificarComentario(idComentario,comentarioData).subscribe(
          (response) => {
            console.log('Cometario modificada:', response);
            
            
          },
          (error) => {
            console.error('Error al insertar el miembro:', error);
            Swal.fire({
              icon: 'success',
              title: 'Has modificado el comentario',
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload(); 
              }
            });
          }
        );
      }
    });
}
}

