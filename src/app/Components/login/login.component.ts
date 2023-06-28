import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/Services/usuario-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerData = {
    correoElectronico: '',
    contrasena: '',
  };

  usuario: any = {};

  constructor(private UsuarioServiceService: UsuarioServiceService) {}

  ngOnInit(): void {
  }

  iniciarSesion() {
    console.log(this.usuario)
    this.UsuarioServiceService.login(this.usuario).subscribe(
      (respuesta) => {
        if (respuesta.status) {
          // Inicio de sesión exitoso
          console.log('Inicio de sesión exitoso');
          console.log('Usuario:', respuesta.usuario);
          // Aquí puedes redirigir a otra página o realizar otras acciones
          Swal.fire({
            title: '¡Credenciales correctas!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            timer: 3000,  // La alerta se cerrará automáticamente después de 3 segundos
            timerProgressBar: true,
          });
        } else {
          // Credenciales inválidas
          console.log('Credenciales inválidas');
          Swal.fire({
            title: '¡Credenciales incorrectas!',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      (error) => {
        // Error al realizar la solicitud
        console.log('Error:', error);
      }
    );
  }

}
