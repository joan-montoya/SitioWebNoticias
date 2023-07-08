import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicar-noticia',
  templateUrl: './publicar-noticia.component.html',
  styleUrls: ['./publicar-noticia.component.css']
})
export class PublicarNoticiaComponent implements OnInit {

  titulo = "";
  contenido = "";
  imagen = "";
  noticias: any;
  idCategoria: any;

  constructor(private NoticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.idCategoria = localStorage.getItem('catIngresado');
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

  publicarNoticia() {
    // Crear objeto de noticia
    const imagenData = {
      titulo: this.titulo,
      contenido: this.contenido,
      imagen: btoa(this.imagen),
      grupo: {
        idGrupo: localStorage.getItem('idGrup')
      },
      categoria: {
        idCategoria: localStorage.getItem('catIngresado')
      },
      administrador: {
        idUsuario: localStorage.getItem('idUsuario')
      }
    }

      //logica para la insercion de noticias
      this.NoticiasService.guardarNoticia(imagenData).subscribe(
        (response) => {
          console.log('Noticia insertada:', response);
          Swal.fire({
            icon: 'success',
            title: 'Noticia insertado con éxito',
          });
        },
        (error) => {
          console.error('Error al insertar el grupo:', error);
          // Lógica de manejo de errores
        }
      );

    }

  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.readFile(file).then((base64: string) => {
      this.imagen = base64;
    });
  }

  readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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

}
