import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/Services/usuario-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



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
  user: any = {};

  constructor(private UsuarioServiceService: UsuarioServiceService, private router: Router) {}

  ngOnInit(): void {
  }

  iniciarSesion() {
    console.log(this.usuario)
    this.UsuarioServiceService.login(this.usuario).subscribe(
      (respuesta) => {
        if (respuesta.status) {
          // Inicio de sesión exitoso
          console.log('Inicio de sesión exitoso');
          //guardamos el usuario
          this.user = respuesta.usuario;
          console.log('Usuario:', this.user);
          // Aquí puedes redirigir a otra página o realizar otras acciones
          Swal.fire({
            title: '¡Credenciales correctas!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            timer: 3000,  // La alerta se cerrará automáticamente después de 3 segundos
            timerProgressBar: true,
          }).then(() => {
            // Almacena los valores individuales en el localStorage
            localStorage.setItem('idUsuario', this.user.idUsuario.toString());
            localStorage.setItem('nombreUsuario', this.user.nombreUsuario);
            localStorage.setItem('contrasena', this.user.contrasena);
            localStorage.setItem('correoElectronico', this.user.correoElectronico);
            localStorage.setItem('nombre', this.user.nombre);
            localStorage.setItem('apellido', this.user.apellido);
            localStorage.setItem('telefono', this.user.telefono);
            localStorage.setItem('avatar', this.user.avatar);
            this.router.navigate(['/rgrupo']).then(() => {
              window.location.reload();
            });
          });
        } else {
          // Credenciales inválidas
          console.log('Credenciales inválidas');
          Swal.fire({
            title: '¡Credenciales incorrectas!',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
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
