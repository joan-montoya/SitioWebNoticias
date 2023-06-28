import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../Models/Usuario';
import { UsuarioServiceService } from '../../Services/usuario-service.service';
import Swal from 'sweetalert2';


import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioServiceService]
})
export class RegisterComponent implements OnInit {

  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  usuarios: Usuario[] = [];
  registerData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    username: '',
    avatar: ''
  };

  imageOptions = [
    '../../../assets/carousel/imagen1.jpg',
    '../../../assets/carousel/imagen2.jpg',
    '../../../assets/carousel/imagen3.jpg',
    '../../../assets/carousel/imagen4.jpg',
    '../../../assets/carousel/imagen5.jpg',
    '../../../assets/carousel/imagen6.jpg',
    '../../../assets/carousel/imagen7.jpg',
    '../../../assets/carousel/imagen8.jpg',
  ];

  selectedImage: string = '';
  imageRows: string[][] = [];

  constructor(private UsuarioServiceService: UsuarioServiceService) {
    this.generateImageRows();
  }

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
      telefono: this.registerData.phone,
      avatar: this.registerData.avatar
    };
  
    // Validar si el correo electrónico ya está registrado
    const usuarioExistenteCorreo = this.usuarios.find(u => u.correoElectronico === usuario.correoElectronico);
    if (usuarioExistenteCorreo) {
      Swal.fire('Error', 'El correo electrónico ya está registrado.', 'error');
      return;
    }
  
    // Validar si el nombre de usuario ya está registrado
    const usuarioExistenteNombre = this.usuarios.find(u => u.nombreUsuario === usuario.nombreUsuario);
    if (usuarioExistenteNombre) {
      Swal.fire('Error', 'El nombre de usuario ya está registrado.', 'error');
      return;
    }
  
    // Validar longitud mínima de la contraseña
    if (usuario.contrasena.length < 8) {
      Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres.', 'error');
      return;
    }
  
    console.log(usuario);
  
    this.UsuarioServiceService.crearUsuario(usuario)
      .subscribe(
        nuevoUsuario => {
          Swal.fire('Registro exitoso', 'Usuario registrado correctamente.', 'success').then(() => {
            location.reload(); // Recargar el sitio después de un registro exitoso
          });
          console.log('Usuario registrado:', nuevoUsuario);
        },
        error => {
          Swal.fire('Error', 'Error al registrar usuario.', 'error');
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

  
  isImageSelected(image: string): boolean {
    return this.registerData.avatar === image;
  }

  generateImageRows() {
    let tempRows: string[][] = [];
    for (let i = 0; i < this.imageOptions.length; i += 4) {
      tempRows.push(this.imageOptions.slice(i, i + 4));
    }
    this.imageRows = tempRows;
  }
  
  selectImage(image: string) {
    this.registerData.avatar = image;
  }
  
}
