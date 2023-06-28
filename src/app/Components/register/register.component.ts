import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../Models/Usuario';
import { UsuarioServiceService } from '../../Services/usuario-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioServiceService]
})
export class RegisterComponent implements OnInit {

  registerData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    username: ''
  };

  usuarios: Usuario[] = [];

  constructor(private UsuarioServiceService: UsuarioServiceService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  registrarUsuario() {
    const usuario: Usuario = {
      nombreUsuario: this.registerData.username,
      contrasena: this.registerData.password,
      correoElectronico: this.registerData.email,
      nombre: this.registerData.firstName,
      apellido: this.registerData.lastName,
      telefono: this.registerData.phone
    };

    this.UsuarioServiceService.crearUsuario(usuario)
      .subscribe(
        nuevoUsuario => {
          console.log('Usuario registrado:', nuevoUsuario);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
  }

  obtenerUsuarios() {
    this.UsuarioServiceService.obtenerUsuarios()
      .subscribe(
        usuarios => {
          this.usuarios = usuarios;
          console.log('Usuarios obtenidos:', usuarios);
          // Realizar acciones con la respuesta recibida
        },
        error => {
          console.error('Error al obtener usuarios:', error);
          // Manejar el error
        }
      );
  }

  

}
