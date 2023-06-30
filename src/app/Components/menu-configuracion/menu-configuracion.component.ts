import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/Services/usuario-service.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../Models/Usuario';

@Component({
  selector: 'app-menu-configuracion',
  templateUrl: './menu-configuracion.component.html',
  styleUrls: ['./menu-configuracion.component.css']
})
export class MenuConfiguracionComponent implements OnInit {

  nombreUsuario: string = "";
  correoElectronico: string = "";
  telefono: string = "";
  avatar: string = "";
  mostrarForm: boolean = false;

  // Variables para el formulario de actualización
  firstName: string = "";
  lastName: string = "";
  phone: string = "";
  email: string = "";
  userId: String = "";
  password: string ='';
  username: String = '';
  registerData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    username: '',
    avatar: ''
  };

  // variables para el manejo de avatar
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

  constructor(private UsuarioServiceService: UsuarioServiceService) { }

  ngOnInit(): void {
    this.firstName = localStorage.getItem('nombre') || '';
    this.lastName = localStorage.getItem('apellido') || '';
    this.telefono = localStorage.getItem('telefono') || '';
    this.correoElectronico = localStorage.getItem('correoElectronico') || '';
    this.avatar = localStorage.getItem('avatar') || '';
    this.userId = localStorage.getItem('idUsuario') || '';
    this.password = localStorage.getItem('contrasena') || '';
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.generateImageRows();
  }
  mostrarFormulario() {
    this.firstName = localStorage.getItem('nombre') || '';
    this.lastName = localStorage.getItem('apellido') || '';
    this.phone = localStorage.getItem('telefono') || '';
    this.email = localStorage.getItem('correoElectronico') || '';
    this.avatar = localStorage.getItem('avatar') || '';
    this.userId = localStorage.getItem('idUsuario') || '';
    this.password = localStorage.getItem('contrasena') || '';
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.mostrarForm = true;

    //cargamos los datos al formulario
     
      this.registerData.firstName = localStorage.getItem('nombre') || '';
      this.registerData.lastName = localStorage.getItem('apellido') || '';
      this.registerData.phone = localStorage.getItem('telefono') || '';
      this.registerData.email = localStorage.getItem('correoElectronico') || '';
      this.registerData.password = localStorage.getItem('contrasena') || '';
      this.registerData.username = localStorage.getItem('nombreUsuario') || '';
    
  }

  actualizarPerfil() {
    // Guardar los nuevos valores en el localStorage
    localStorage.setItem('nombre', this.firstName);
    localStorage.setItem('apellido', this.lastName);
    localStorage.setItem('telefono', this.phone);
    localStorage.setItem('correoElectronico', this.email);
    localStorage.setItem('avatar', this.avatar);

    // Actualizar los valores en la vista
    const usuario: Usuario = {
      nombreUsuario:  this.registerData.username,
      contrasena: this.password,
      correoElectronico: this.registerData.email,
      nombre: this.registerData.firstName,
      apellido: this.registerData.lastName,
      telefono: this.registerData.phone,
      avatar: this.registerData.avatar
    };

    this.mostrarForm = false;

    //mandamos el servicio
    this.UsuarioServiceService.modificarUsuario(this.userId, usuario) // Se asume que tienes disponible el ID del usuario que deseas modificar en this.userId
    .subscribe(
      usuarioModificado => {
        Swal.fire('Modificación exitosa', 'Usuario modificado correctamente.', 'success').then(() => {
          // Almacena los valores individuales en el localStorage
          localStorage.setItem('nombreUsuario', this.registerData.username);
          localStorage.setItem('contrasena', this.password);
          localStorage.setItem('correoElectronico',this.registerData.email);
          localStorage.setItem('nombre', this.registerData.firstName);
          localStorage.setItem('apellido', this.registerData.lastName);
          localStorage.setItem('telefono', this.registerData.phone);
          localStorage.setItem('avatar', this.registerData.avatar);
          location.reload(); // Recargar el sitio después de una modificación exitosa
        });
        console.log('Usuario modificado:', usuarioModificado);
      },
      error => {
        Swal.fire('Error', 'Error al modificar usuario.', 'error');
        console.error('Error al modificar usuario:', error);
      }
    );
  }

  cancelarActualizacion() {
    this.mostrarForm = false;
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