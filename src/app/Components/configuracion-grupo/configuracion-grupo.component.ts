import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/Services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-grupo',
  templateUrl: './configuracion-grupo.component.html',
  styleUrls: ['./configuracion-grupo.component.css']
})
export class ConfiguracionGrupoComponent implements OnInit {
  grupo: any
  nombreUsuario: string = "";
  correoElectronico: string = "";
  telefono: string = "";
  avatar: string = "";
  mostrarForm: boolean = false;

   grupoData = {
    descripcion: "",
    nombre: "",
    codigoAcceso: "",
    administrador: {
      idUsuario: ""
    },
    imagen: ""
  };

  constructor(private GruposService: GruposService) { }

  ngOnInit(): void {
    this.ObtenerGrupo();
  }

  //obtencion de grupo y filtro para listar solo el grupo seleccionado
  ObtenerGrupo() {
    const idGrupo = localStorage.getItem('idGrup');
    this.GruposService.obtenerGrupos().subscribe(
        (response) => {
          this.grupo = response.filter((grupo: any) => grupo.idGrupo == idGrupo)
          this.grupoData.nombre = this.grupo[0]?.nombre
          this.grupoData.codigoAcceso = this.grupo[0]?.codigoAcceso
          this.grupoData.administrador.idUsuario = this.grupo[0]?.idAdministrador
          this.grupoData.descripcion = this.grupo[0]?.descripcion
          this.grupoData.imagen = atob(this.grupo[0]?.imagen)
        },
        (error) => {
          console.log(error)
        }
      )
  }



  actualizarGrupo() {
    //obtencion de id de grupo
    const idGrupo = localStorage.getItem('idGrup');
    // Aquí puedes implementar la lógica para enviar los datos actualizados del grupo al servidor
    const Data = {
      descripcion: this.grupoData.descripcion,
      nombre: this.grupoData.nombre,
      codigoAcceso: this.grupoData.codigoAcceso,
      administrador: {
        idUsuario: this.grupo[0]?.idAdministrador
      },
      imagen: btoa(this.grupoData.imagen)
    };
    console.log(this.grupoData);

    this.GruposService.modificarGrupo(idGrupo, Data) // Se asume que tienes disponible el ID del usuario que deseas modificar en this.userId
    .subscribe(
      usuarioModificado => {
        Swal.fire('Modificación exitosa', 'Grupo modificado correctamente.', 'success').then(() => {
          
          location.reload(); // Recargar el sitio después de una modificación exitosa
        });
        console.log('Grupo modificado:', usuarioModificado);
      },
      error => {
        Swal.fire('Error', 'Error al modificar grupo.', 'error');
        console.error('Error al modificar grupo:', error);
      }
    );
  }

  //logica para la obtencion de imagenes
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.readFile(file).then((base64: string) => {
      this.grupoData.imagen = base64;
    });
  }

  //logica para la obtencion de imagenes
  readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  //logica para la obtencion de imagenes
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


  mostrarFormulario() {
    this.mostrarForm = true;
  }

  actualizarPerfil() {
    // Aquí puedes implementar la lógica para guardar los datos actualizados del perfil
  }

  cancelarActualizacion() {
    this.mostrarForm = false;
  }

  selectImage(image: string) {
    // Implementa la lógica para seleccionar una imagen
  }

  isImageSelected(image: string): boolean {
    // Implementa la lógica para determinar si una imagen está seleccionada
    return false;
  }

}
