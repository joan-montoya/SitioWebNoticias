import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_noticias';
  nombreUsuario: any;
  sesionIniciada: boolean = false;

  constructor(private router: Router) {}


  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    this.sesionIniciada = !!this.nombreUsuario; // Establecer el valor de sesionIniciada
  }
  

  cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    this.sesionIniciada = false;
    Swal.fire('Cierre de sesión', 'Has cerrado sesión exitosamente.', 'success').then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }
  
  
  
  
}


