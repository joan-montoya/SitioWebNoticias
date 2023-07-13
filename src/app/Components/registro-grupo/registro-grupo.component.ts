import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/Services/grupos.service';
import { Grupo } from 'src/app/Models/Grupo';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MiembroService } from 'src/app/Services/miembro.service';

@Component({
  selector: 'app-registro-grupo',
  templateUrl: './registro-grupo.component.html',
  styleUrls: ['./registro-grupo.component.css']
})
export class RegistroGrupoComponent implements OnInit {

  grupo: Grupo = new Grupo();
  user: any;
  grupos: any;
  nogrupos: any;
  grup: any;
  miembroP: any[];
  gruposP: any[];
  miembros: any;

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

  obtenerGrupos() {
    const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10); // Obtener el ID de usuario de localStorage y convertirlo a número
      this.GruposService.obtenerGrupos()
      .pipe(
        //obtnemos los grupos que el usuario  no creo
        map(grupos => grupos.filter((grupo: any) => grupo.idAdministrador !== idUsuario)),
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
              // Filtrar los grupos cuyos IDs no estén registrados en miembroP
              const gruposFiltrados = gruposModificados.filter(grupo => !idsGruposRegistrados.includes(grupo.idGrupo));
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

  //logica para generar codigo de acceso
  generarCodigoAcceso(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigoAcceso = '';
    
    for (let i = 0; i < 6; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigoAcceso += caracteres.charAt(indice);
    }
    
    return codigoAcceso;
  }
  
  guardarGrupo() {
    const grupoData = {
      descripcion: this.grupo.descripcion,
      nombre: this.grupo.nombre,
      codigoAcceso: this.generarCodigoAcceso(),
      administrador: {
        idUsuario: this.user.idUsuario
      },
      imagen: btoa(this.grupo.imagen)
    };
    this.GruposService.guardarGrupo(grupoData).subscribe(
      (response) => {
        console.log('Grupo insertado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Grupo insertado con éxito',
          html: `<img src="${atob(grupoData.imagen)}" style="width: 50px; height: 50px; margin-top: 10px;">
                 <div><strong>Nombre:</strong> ${grupoData.nombre}</div>
                 <div><strong>Descripción:</strong> ${grupoData.descripcion}</div>`
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.readFile(file).then((base64: string) => {
      this.grupo.imagen = base64;
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

  seleccionarGrupo(idGrupo: any, id: any) {
    localStorage.setItem('grupoSeleccionado', idGrupo);
    //obtencion del objeto de grupo seleccionado
    this.grup = this.grup.filter((grupo: any) => grupo.idGrupo === idGrupo);
    console.log(this.grup)
    Swal.fire({
      title: '¿Deseas unirte a este grupo?',
      text: 'Ingrese el codigo de acceso',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Rechazar',
      allowOutsideClick: false,
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // Lógica para unirse al grupo
        const value: string = result.value;
        if(value == this.grup[0].codigoAcceso){
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
              title: 'Te has unido a',
              html: `<img src="${this.grupos[id]?.imagen}" style="width: 50px; height: 50px; margin-top: 10px;">
                     <div><strong>Nombre:</strong> ${this.grupos[id]?.nombre}</div>
                     <div><strong>Descripción:</strong> ${this.grupos[id]?.descripcion}</div>`
            });
            
          },
          (error) => {
            console.error('Error al insertar el miembro:', error);
            // Lógica de manejo de errores
          }
        );
        
        Swal.fire('¡Te has unido al grupo!', '', 'success').then(() => {
          window.location.reload(); // Recargar la página después de mostrar el mensaje de éxito
        });

        }else{
          Swal.fire('¡codigo de acceso incorrecto!', '', 'error').then(() => {
            window.location.reload(); // Recargar la página después de mostrar el mensaje de éxito
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Lógica para rechazar el grupo
        // ...
        Swal.fire('Sigue buscando', '', 'info');
      }
    });
  }
  
  
}

