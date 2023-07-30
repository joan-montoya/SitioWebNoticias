import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MensajesService } from './Services/mensajes.service';
import { MiembroService } from './Services/miembro.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_noticias';
  nombreUsuario: any;
  sesionIniciada: boolean = false;
  showGruposOptions: boolean;
  avatar: any;
  firstName: any
  lastName: any
  mensajes: any
  idUsuario: any;
  user: any;
  mostrarContainer: boolean = false;

  constructor(private router: Router, private MensajesService: MensajesService, private MiembroService: MiembroService,) {
    this.showGruposOptions = false;
    this.avatar = localStorage.getItem('avatar') || '';
    this.firstName = localStorage.getItem('nombre') || '';
    this.lastName = localStorage.getItem('apellido') || '';
    const idUsuario = localStorage.getItem('idUsuario');
    this.idUsuario = localStorage.getItem('idUsuario');
    const idUsuarioNumber = idUsuario ? parseInt(idUsuario, 10) : 0;
    this.user = { idUsuario: idUsuarioNumber };
  }


  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    this.sesionIniciada = !!this.nombreUsuario; // Establecer el valor de sesionIniciada
    this.getMensajes()
  }

  toggleGrupos() {
    this.showGruposOptions = !this.showGruposOptions;
  }
  

  cerrarSesion() {
    localStorage.clear();
    this.sesionIniciada = false;
    Swal.fire('Cierre de sesión', 'Has cerrado sesión exitosamente.', 'success').then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }

  goBack() {
    history.back();
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
  
  
  
}


