import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaService } from 'src/app/Services/categoria.service';

@Component({
  selector: 'app-tablero-grupos',
  templateUrl: './tablero-grupos.component.html',
  styleUrls: ['./tablero-grupos.component.css']
})
export class TableroGruposComponent implements OnInit {

  nombres: string[] = [];
  grupo: any;
  id: any;
  categorias: any

  constructor(private CategoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.grupo = localStorage.getItem('grupoIngresado');
    this.id = parseInt(localStorage.getItem('idGrup') || '0', 10);
    this.obtnerCategorias();
  }

  generateCard(nombre: string) {
    this.nombres.push(nombre);
  }

  updateCards() {
    // Agregar la opción de "Agregar Categoría" en la primera posición
    this.nombres.unshift('Agregar Categoría');
  }

  showFormPopup() {
    Swal.fire({
      title: 'Agregar Categoría',
      text: 'Ingrese el nombre de la categoría:',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const value: string = result.value;
        this.generateCard(value);
        //creacion de json para la insercion
        const categoriaData = {
          nombreCategoria: value,
          grupo: {
            idGrupo: this.id
          },
        };
        console.log(categoriaData)
        //logica de insersion de categoria
        this.CategoriaService.guardarCategoria(categoriaData).subscribe(
          (response) => {
            console.log('categoria insertado:', response);
            Swal.fire({
              icon: 'success',
              title: 'Has insertado la categoría ' + value,
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload(); 
              }
            });
            
          },
          (error) => {
            console.error('Error al insertar el miembro:', error);
            // Lógica de manejo de errores
          }
        );
      }
    });
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
    Swal.fire({
      title: '¿Deseas acceder a este contenido de noticias sobre '+ nombreCat +" ?",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Rechazar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para unirse al grupo
        window.location.href = '/pubnoticia'; // Redirige al usuario a la ubicación /tablerog
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
}
