import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { NoticiasService } from 'src/app/Services/noticias.service';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/Services/comentario.service';
import { ReaccionService } from 'src/app/Services/reaccion.service';
import { FavoritoService } from 'src/app/Services/favorito.service';

@Component({
  selector: 'app-tablero-cat',
  templateUrl: './tablero-cat.component.html',
  styleUrls: ['./tablero-cat.component.css']
})
export class TableroCatComponent implements OnInit {
  
  id: any;
  categorias: any
  grupo: any

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
  contR = 0;
  Reac: any;

  nuevoComentario: string = '';
  reaccionesPorNoticia: Map<number, number> = new Map<number, number>();

  constructor(
    private CategoriaService: CategoriaService,
    private NoticiasService: NoticiasService, 
    private ComentarioService: ComentarioService,
    private ReaccionService: ReaccionService,
    private FavoritoService: FavoritoService
    ) { }

  ngOnInit(): void {
    this.grupo = localStorage.getItem('grupoIngresado');
    this.id = parseInt(localStorage.getItem('idGrup') || '0', 10);
    this.obtnerCategorias();
    this.idCategoria = localStorage.getItem('catIngresado');
    this.nombreCat = localStorage.getItem('nombreCat');
    this.obtnerNoticias();
    this.ObtenerComentarios()
    this.obtenerReacciones()
    this.obtenerFavoritos()
  }

  obtnerCategorias() {
    //logica para la obtencion de categorias
    this.CategoriaService.obtenerCategorias()
    .subscribe(
      categorias => {
        this.categorias = categorias
        //creamos un filtro donde solo tendremos los miembros (registros de miembros) que pertenecen al usuario registrado
        this.categorias = categorias.filter((categoria: any) => categoria.idGrupo == this.id);
      },
    error => {
      console.error('Error al obtener miembros:', error);
      // Manejar el error
      }
    );
  }

  seleccionarCategoria(idCategoria: any, nombreCat: any) {
    localStorage.setItem('catIngresado', idCategoria);
    localStorage.setItem('nombreCat', nombreCat);
    Swal.fire({
      title: '¿Deseas acceder a este contenido de noticias sobre '+ nombreCat +" ?",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Rechazar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para unirse al grupo
        window.location.href = '/noticias'; // Redirige al usuario a la ubicación /tablerog
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Lógica para rechazar el grupo
        // ...
        Swal.fire('Sigue buscando', '',);
      }
    });
    
  }

  generarClaseAleatoria(): string {
    const clases = ['card1', 'card2', 'card3', 'card4'];
    const indiceAleatorio = Math.floor(Math.random() * clases.length);
    return clases[indiceAleatorio];
  }

  obtnerNoticias() {
    //logica para la obtencion de categorias
    this.NoticiasService.obtenerNoticias()
    .subscribe(
      noticias => {
        //creamos un filtro donde solo tendremos los miembros (registros de miembros) que pertenecen al usuario registrado
        this.noticias = noticias.filter((noticia: any) => noticia.idGrupo == this.id);
        this.noticias = this.noticias.map((noticia: any) => {
          // Decodificar el valor de la imagen utilizando atob()
          noticia.imagen = atob(noticia.imagen);
      
          // Retornar un nuevo objeto con la propiedad 'imagen' modificada
          return noticia
        });
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



  verificarNoticia(idNoticia: number): boolean {
    const porcentajeMinimo = 30;
  
    // Clonar el array de reacciones para evitar modificar el original durante el ciclo de detección de cambios
    const reaccionesFiltradas = this.reacciones.filter((reaccion: any) => reaccion.idNoticia == idNoticia);
  
    // Calcular el contador global de reacciones para todas las noticias mostradas sin modificar la propiedad this.contR
    const contadorGlobal = this.reacciones.filter((reaccion: any) => reaccion.idGrupo == this.id);

    // Almacenar la cantidad de reacciones para la noticia actual en el mapa
    this.reaccionesPorNoticia.set(idNoticia, reaccionesFiltradas.length);
  
    // Verificar si la noticia actual tiene más del 30% de las reacciones totales
    if ((reaccionesFiltradas.length / contadorGlobal.length) * 100 >= porcentajeMinimo) {
      
      return true;
    }
    return false;
  }

   // Función para obtener la cantidad de reacciones por idNoticia
getCantidadReacciones(idNoticia: number): number {
  // Filtrar las reacciones solo para la noticia actual (idNoticia)
  const reaccionesFiltradas = this.reacciones.filter((reaccion: any) => reaccion.idNoticia === idNoticia);

  // Devolvemos la cantidad de reacciones para esa noticia.
  return reaccionesFiltradas.length;
}
  
  
  
  
}