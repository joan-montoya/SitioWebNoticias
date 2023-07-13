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
  showGruposOptions: boolean;

  constructor(private router: Router) {
    this.showGruposOptions = false;
  }


  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    this.sesionIniciada = !!this.nombreUsuario; // Establecer el valor de sesionIniciada
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
  
  
  
  
}


