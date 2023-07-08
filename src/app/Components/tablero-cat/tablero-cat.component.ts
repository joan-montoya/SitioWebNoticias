import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablero-cat',
  templateUrl: './tablero-cat.component.html',
  styleUrls: ['./tablero-cat.component.css']
})
export class TableroCatComponent implements OnInit {
  
  id: any;
  categorias: any
  grupo: any

  constructor(private CategoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.grupo = localStorage.getItem('grupoIngresado');
    this.id = parseInt(localStorage.getItem('idGrup') || '0', 10);
    this.obtnerCategorias();
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

}
