import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/Services/grupos.service';
import { Grupo } from 'src/app/Models/Grupo';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-grupo',
  templateUrl: './registro-grupo.component.html',
  styleUrls: ['./registro-grupo.component.css']
})
export class RegistroGrupoComponent implements OnInit {

  grupo: Grupo = new Grupo();
  user: any;
  grupos: any;

  constructor(private GruposService: GruposService) { 
     // Obtener el idUsuario del localStorage
     const idUsuario = localStorage.getItem('idUsuario');
     const idUsuarioNumber = idUsuario ? parseInt(idUsuario, 10) : 0;
     this.user = { idUsuario: idUsuarioNumber };

  }

  ngOnInit(): void {
    this.obtenerGrupos()
  }

  obtenerGrupos() {
    const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10); // Obtener el ID de usuario de localStorage y convertirlo a número
    this.GruposService.obtenerGrupos()
      .pipe(
        map(grupos => grupos.filter(grupo => grupo.administrador.idUsuario === idUsuario)),
        map(gruposFiltrados => gruposFiltrados.map(grupo => {
          // Modificar el valor de cada grupo
          grupo.imagen = atob(grupo.imagen);
          return grupo;
        }))
      )
      .subscribe(
        gruposModificados => {
          this.grupos = gruposModificados;
          console.log('grupos obtenidos:', gruposModificados);
          // Realizar acciones con los grupos modificados
        },
        error => {
          console.error('Error al obtener grupos:', error);
          // Manejar el error
        }
      );
  }
  
  
  

  guardarGrupo() {
    const grupoData = {
      descripcion: this.grupo.descripcion,
      nombre: this.grupo.nombre,
      codigoAcceso: this.grupo.codigoAcceso,
      administrador: {
        idUsuario: this.user.idUsuario
      },
      imagen: btoa(this.grupo.imagen)
    };
    console.log(grupoData)

    this.GruposService.guardarGrupo(grupoData).subscribe(
      (response) => {
        console.log('Grupo insertado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Grupo insertado con éxito',
          html: `<img src="${atob(grupoData.imagen)}" style="width: 50px; height: 50px; margin-top: 10px;">
                 <div><strong>Nombre:</strong> ${grupoData.nombre}</div>
                 <div><strong>Descripción:</strong> ${grupoData.descripcion}</div>`
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
  
  
}


