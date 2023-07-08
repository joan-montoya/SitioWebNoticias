import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: any;
  idCategoria: any;
  nombreCat: any;

  constructor(private NoticiasService: NoticiasService ) { }

  ngOnInit(): void {
    this.idCategoria = localStorage.getItem('catIngresado');
    this.nombreCat = localStorage.getItem('nombreCat');
    this.obtnerNoticias();
  }

  obtnerNoticias() {
    //logica para la obtencion de categorias
    this.NoticiasService.obtenerNoticias()
    .subscribe(
      noticias => {
        //creamos un filtro donde solo tendremos los miembros (registros de miembros) que pertenecen al usuario registrado
        this.noticias = noticias.filter((noticia: any) => noticia.idCategoria == this.idCategoria);
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

}
