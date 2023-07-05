import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/Services/grupos.service';
import { Grupo } from 'src/app/Models/Grupo';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-grupos',
  templateUrl: './menu-grupos.component.html',
  styleUrls: ['./menu-grupos.component.css']
})
export class MenuGruposComponent implements OnInit {

  grupo: Grupo = new Grupo();
  user: any;
  grupos: any;

  constructor(private GruposService: GruposService) { 
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem('idUsuario');
    const idUsuarioNumber = idUsuario ? parseInt(idUsuario, 10) : 0;
    this.user = { idUsuario: idUsuarioNumber };

 }

 ngOnInit(): void {
   this.obtenerGrupos()
 }

 obtenerGrupos() {
   const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10); // Obtener el ID de usuario de localStorage y convertirlo a número
   this.GruposService.obtenerGrupos()
     .pipe(
       map(grupos => grupos.filter(grupo => grupo.administrador.idUsuario === idUsuario)),
       map(gruposFiltrados => gruposFiltrados.map(grupo => {
         // Modificar el valor de cada grupo
         grupo.imagen = atob(grupo.imagen);
         return grupo;
       }))
     )
     .subscribe(
       gruposModificados => {
         this.grupos = gruposModificados;
         console.log('grupos obtenidos:', gruposModificados);
         // Realizar acciones con los grupos modificados
       },
       error => {
         console.error('Error al obtener grupos:', error);
         // Manejar el error
       }
     );
 }

}
