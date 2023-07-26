import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/Services/grupos.service';
import { Grupo } from 'src/app/Models/Grupo';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Miembro } from 'src/app/Models/Miembro';
import { MiembroService } from 'src/app/Services/miembro.service';
import { MensajesService } from 'src/app/Services/mensajes.service';

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
  idUsuario: any;
  gruposNoCoincidentes = [];
  miembrosid: any; 
  members: any;
  mensajes: any
  mostrarContainer: boolean = false;

  constructor(private GruposService: GruposService, private MiembroService: MiembroService, private MensajesService: MensajesService) { 
    // Obtener el idUsuario del localStorage
    const idUsuario = localStorage.getItem('idUsuario');
    this.idUsuario = localStorage.getItem('idUsuario');
    const idUsuarioNumber = idUsuario ? parseInt(idUsuario, 10) : 0;
    this.user = { idUsuario: idUsuarioNumber };
    this.miembroP = [];
    this.gruposP = [];
    this.grup = [];
 }

 ngOnInit(): void {
   this.obtenerGrupos()
   this.obtenerMiembros()
   this.obtnerMiem()
   this.getMensajes()
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
          map(grupos => grupos.filter((grupo: any) => grupo.idAdministrador !== idUsuario)),
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
       map(grupos => grupos.filter((grupo: any) => grupo.idAdministrador === idUsuario)),
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
       map(grupos => grupos.filter((grupo: any) => grupo.idAdministrador === idUsuario)),
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

   //logica para obtner mensajes
   getMensajes() {
    this.MensajesService.obtenerMensajes().subscribe(
      (response) => {
        this.mensajes = response.filter((mensaje: any) => mensaje.receptor.idUsuario === this.user.idUsuario),
        console.log(this.mensajes)
      },
      (error) => {
        console.log(error)
      }
    )

  }
  mostrarMensajes() {
    this.mostrarContainer = !this.mostrarContainer;
  }

  //logica de mensajes
  eliminarMensaje(idmensaje: any) {
    this.MensajesService.eliminarMensaje(idmensaje).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje eliminado con éxito',
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  aceptarMensaje(idusuario: any, grupo: any, nombreGrupo: any, idMensaje:any) {
    const partes: string[] = nombreGrupo.split(":");
    const nombreGrupo2: string = partes[1].trim();
    const miembroData = {
      usuario: {
        idUsuario: parseInt(idusuario)
      },
      grupo: {
        idGrupo: parseInt(grupo)
      },
    };

    //logica de insersion de miembro
    this.MiembroService.guardarMiembro(miembroData).subscribe(
      (response) => {
        console.log('miembro insertado:', response);

        this.MensajesService.eliminarMensaje(idMensaje).subscribe(
          (response) => {
          },
          (error) => {
            console.log(error);
          }
        );

        const respuestaData = {
          emisor: {
            idUsuario: this.user.idUsuario
          },
          receptor: {
            idUsuario: parseInt(idusuario)
          },
          contenido: "Fuiste aceptado en el grupo: "+nombreGrupo2,
          leido: true,
          grupo: grupo
        };
        
        //logica para la insercion de respuesta
        this.MensajesService.guardarMensaje(respuestaData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Miembro aceptado',
              text: 'Has aceptado a un nuevo miembro en: '+ nombreGrupo2,
            }).then(() => {
              window.location.reload();
            });
            
          },
          (error) => {
            console.error('Error al insertar el miembro:', error);
            // Lógica de manejo de errores
          }
        );
        
      },
      (error) => {
        console.error('Error al insertar el miembro:', error);
        // Lógica de manejo de errores
      }
    );
  }

 //logica para la alerta redireccione dentro del grupo
 seleccionarGrupo(nombreGrupo: any, id: any) {
  localStorage.setItem('grupoIngresado', nombreGrupo);
  localStorage.setItem('idGrup', id);

  Swal.fire({
    title: '¿Deseas acceder a este grupo?',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Rechazar',
    icon: 'question',
    showCloseButton: true,
    closeButtonAriaLabel: 'Cerrar',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
      closeButton: 'btn btn-secondary',
      actions: 'd-flex justify-content-between mt-4'
    },
    showLoaderOnConfirm: true,
    buttonsStyling: true, // Desactivar estilos de botones predeterminados
    preConfirm: () => {
      return new Promise<void>((resolve) => {
        resolve();
      });
    },
    // No incluir el tercer botón en el footer
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica para unirse al grupo
      window.location.href = '/tablerog';
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Lógica para rechazar el grupo
      Swal.fire('Sigue buscando', '', 'info');
    }
  });

}

//logica para redireccionar a editar grupo
configurarBoton(nombreGrupo: any, id: any) {
  localStorage.setItem('grupoIngresado', nombreGrupo);
  localStorage.setItem('idGrup', id);

  Swal.fire({
    title: '¿Deseas editar este grupo?',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Rechazar',
    icon: 'question',
    showCloseButton: true,
    closeButtonAriaLabel: 'Cerrar',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
      closeButton: 'btn btn-secondary',
      actions: 'd-flex justify-content-between mt-4'
    },
    showLoaderOnConfirm: true,
    buttonsStyling: true, // Desactivar estilos de botones predeterminados
    preConfirm: () => {
      return new Promise<void>((resolve) => {
        resolve();
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica para unirse al grupo
      window.location.href = '/confgrupos';
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Lógica para rechazar el grupo
    }
  });
      
}


  seleccionarGrupo2(nombreGrupo: any, id: any) {
    localStorage.setItem('grupoIngresado', nombreGrupo);
    localStorage.setItem('idGrup', id);
    Swal.fire({
      title: '¿Deseas acceder a este grupo?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Rechazar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para unirse al grupo
        window.location.href = '/tableroc'; // Redirige al usuario a la ubicación /tablerog
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Lógica para rechazar el grupo
        // ...
          Swal.fire('Sigue buscando', '', 'info');
        }
      });
    }

    abandonarGrupo(idGrupo: any) {
      Swal.fire({
        title: '¿Estás seguro de abandonar el grupo?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, abandonar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.MiembroService.obtenerMiembros().subscribe(
            (response) => {
              this.miembrosid = response.filter((miembro: any) => miembro.idGrupo == idGrupo);
              this.miembrosid = this.miembrosid.filter((miembro: any) => miembro.idUsuario == this.idUsuario)
              this.MiembroService.eliminarMiembro(this.miembrosid[0].idMiembro).subscribe(
                (response) => {
                  location.reload();
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
    }

    //obtenemos los miembros y los guardamos en una valiable aparte
  obtnerMiem(){
    this.MiembroService.obtenerMiembros().subscribe(
      (response) => {
        this.members = response 
      },
      (error) => {
        console.log(error)
      }
    )
  }
    // Función para obtener la cantidad de reacciones por idNoticia
    getCantidadMiembros(idGrupo: number): number {
    // Filtrar las reacciones solo para la noticia actual (idNoticia)
    const reaccionesFiltradas = this.members.filter((miembro: any) => miembro.idGrupo == idGrupo);
  
    // Devolvemos la cantidad de reacciones para esa noticia.
    return reaccionesFiltradas.length;
  }

  eliminarGrupo(idGrupo: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el grupo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
            this.GruposService.eliminarGrupo(idGrupo).subscribe(
              (response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Grupo eliminado con éxito',
                }).then(() => {
                  window.location.reload();
                });
              },
              (error) => {
                console.log(error);
              }
            );
      }
    });
  }
  

}
function rgb(arg0: number, arg1: number, arg2: number): string {
  throw new Error('Function not implemented.');
}

