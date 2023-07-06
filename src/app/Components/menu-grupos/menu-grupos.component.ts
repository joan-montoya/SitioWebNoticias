import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/Services/grupos.service';
import { Grupo } from 'src/app/Models/Grupo';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Miembro } from 'src/app/Models/Miembro';
import { MiembroService } from 'src/app/Services/miembro.service';


@Component({
  selector: 'app-menu-grupos',
  templateUrl: './menu-grupos.component.html',
  styleUrls: ['./menu-grupos.component.css']
})
export class MenuGruposComponent implements OnInit {

  grupo: Grupo = new Grupo();
  grup: any;
  user: any;
  grupos: any;
  nogrupos: any;
  miembro: Miembro = new Miembro();
  misgrupos: any;
  miembros: any;
  miembroP: any[];
  gruposP: any[];
  gruposNoCoincidentes = [];

  constructor(private GruposService: GruposService, private MiembroService: MiembroService) { 
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem('idUsuario');
    const idUsuarioNumber = idUsuario ? parseInt(idUsuario, 10) : 0;
    this.user = { idUsuario: idUsuarioNumber };
    this.miembroP = [];
    this.gruposP = [];
    this.grup = [];
 }

 ngOnInit(): void {
   this.obtenerGrupos()
   this.obtenerMiembros()
 }

 obtenerMiembros() {
  const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10);
  this.MiembroService.obtenerMiembros()
    .subscribe(
      miembros => {
        this.miembros = miembros;
        //creamos un filtro donde solo tendremos los miembros (registros de miembros) que pertenecen al usuario registrado
        this.miembroP = this.miembros.filter((miembro: any) => miembro.idUsuario === idUsuario);
        // Obtener los IDs de los grupos registrados en miembroP
        const idsGruposRegistrados = this.miembroP.map(obj => obj.idGrupo);
        // hacemos un llamado a grupos service para traer los grupos
        this.GruposService.obtenerGrupos()
        .pipe(
          //creamos un filtro para obtner los grupos que no fueron creados por este usuario
          map(grupos => grupos.filter(grupo => grupo.administrador.idUsuario !== idUsuario)),
          map(gruposFiltrados => gruposFiltrados.map(grupo => {
            // Modificar el valor de cada grupo
            grupo.imagen = atob(grupo.imagen);
            return grupo;
          }))
        ).subscribe(
          gruposModificados => {
            this.nogrupos = gruposModificados;
            // Realizar acciones con los grupos modificados
            // Filtrar los grupos cuyos IDs estén registrados en miembroP
            const gruposFiltrados = gruposModificados.filter(grupo => idsGruposRegistrados.includes(grupo.idGrupo));
            this.grup = gruposFiltrados;
          },
          error => {
            console.error('Error al obtener grupos:', error);
            // Manejar el error
          }
        );
      },
      error => {
        console.error('Error al obtener miembros:', error);
        // Manejar el error
      }
    );
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
         // Realizar acciones con los grupos modificados
       },
       error => {
         console.error('Error al obtener grupos:', error);
         // Manejar el error
       }
     );
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
         this.nogrupos = gruposModificados;
         // Realizar acciones con los grupos modificados
       },
       error => {
         console.error('Error al obtener grupos:', error);
         // Manejar el error
       }
     );
 }

 seleccionarGrupo(idGrupo: any, id: any) {
  localStorage.setItem('grupoSeleccionado', idGrupo);
  Swal.fire({
    title: '¿Deseas unirte a este grupo?',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Rechazar',
    icon: 'question',
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica para unirse al grupo
      //creacion de json para la insercion
      const miembroData = {
        usuario: {
          idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10)
        },
        grupo: {
          idGrupo: idGrupo
        },
      };

      //logica de insersion de miembro
      this.MiembroService.guardarMiembro(miembroData).subscribe(
        (response) => {
          console.log('miembro insertado:', response);
          Swal.fire({
            icon: 'success',
            title: 'te has unido a ',
            html: `<img src="${this.grupos[id].imagen}" style="width: 50px; height: 50px; margin-top: 10px;">
                   <div><strong>Nombre:</strong> ${this.grupos[id].nombre}</div>
                   <div><strong>Descripción:</strong> ${this.grupos[id].descripcion}</div>`
          });
        },
        (error) => {
          console.error('Error al insertar el miembro:', error);
          // Lógica de manejo de errores
        }
      );
      
      Swal.fire('¡Te has unido al grupo!', '', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Lógica para rechazar el grupo
      // ...
      Swal.fire('Sigue buscando', '', 'info');
    }
  });
}

}
