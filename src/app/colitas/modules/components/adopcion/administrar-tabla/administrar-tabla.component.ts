import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdopcionesService } from '../../adopcion/adopciones/services/adopciones.service';
import { SharedData } from 'src/app/colitas/services/SharedData.service';
import { Router } from '@angular/router';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { AdministrarTablaService } from './services/administrar-tabla.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-administrar-tabla',
  templateUrl: './administrar-tabla.component.html',
  styleUrls: ['./administrar-tabla.component.scss'],
  providers: [MessageService]

})
export class AdministrarTablaComponent implements OnInit{

  visible: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;
  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';

  buscarTexto: string ='';

  nombre: string;
  edad: string;
  raza: string;
  descripcion : string;
  linkImg : string;
  nombreEncargado: string;


  // public apiUrlback: string = '../images';
  // public apiUrlback: 'http://localhost:3000';


  private urlImagenes: string = 'http://localhost:3000/images/';
    protected publicaciones: any[] = [];
    blockedPanel: boolean = false;
    id: number;
    // nombreImagen:string = "ximena";

    showDialog() {
      // showDialog(action: 'registrar' | 'modificar') {
      // if (action === 'registrar') {
      //   this.publicaciones = 'Registrar Publicación';
      // } else if (action === 'modificar') {
      //   // Lógica específica para modificar
      //   this.publicaciones = 'Modificar Publicación';
      //   this.cargarDatos();
      // }

      this.visible = true;
    }


  hideDialog() {
    this.visible = false;
  }

  constructor(private _adopcionesService: AdopcionesService, private _sharedData: SharedData, public router:Router, private messageService:MessageService, private _http: HttpClient, private _router:Router) { }

  ngOnInit() {
    this.obtenerAdopciones();

  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Publicación registrada con éxito.' });
  }

  showErrorMessage() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar la publicación.' });
  }

//   onGlobalFilter( event: Event) {
//     this.nombre.filterGlobal((event.target as HTMLInputElement).value, 'contains');
// }


onGlobalFilter(buscarTexto: string) {
  if (buscarTexto.trim() === '') {
      // If the search text is empty, restore the original array
      this.obtenerAdopciones();
  } else {
      // Implement your filtering logic here
      this.publicaciones = this.publicaciones.filter(publicacion =>
          publicacion.nombre.toLowerCase().includes(buscarTexto.toLowerCase())
      );
  }
}


  //Listar las ADOPCIONES
  async obtenerAdopciones() {
    try {

      this.publicaciones = [];

        const responseColitas: ResponseColitas = await this._adopcionesService.obtenerAdopciones().toPromise();

        responseColitas.data.forEach(p => {
            p.linkImg = `${this.urlImagenes}${p.img}`;
            p.id = p.codigo;
            // p.fechaPublicacion = `${this.formatoFechasPublicacion(p.fechaPublicacion)}`
            this.publicaciones.push({ ...p });
        });

        console.log(this.publicaciones);
    } catch (error) {
        console.error("Error al obtener las adopciones", error);
    }
}


//PARA HACERLO CON EL BACKEND
// async obtenerAdopciones() {
//   try {
//     const responseColitas: ResponseColitas = await this._adopcionesService.obtenerAdopciones().toPromise();

//     this.publicaciones = responseColitas.data.map(p => ({
//       ...p,
//       id: p.codigo,
//       linkImg: this.obtenerUrlImagenBackend(p.img),
//     }));

//     console.log(this.publicaciones);
//   } catch (error) {
//     console.error("Error al obtener las adopciones", error);
//   }
// }

// obtenerUrlImagenBackend(nombreImagen: string): string {
//   const url = `${this.apiUrlback}/images/${nombreImagen}`;
//   console.log('URL de la imagen:', url);
//   return url;
// }

  // LinkImg(linkImg) {
  //   // quito la palabra public
  //   let str = linkImg.replace(/public/g, '');
  //   // quito la barra '\'
  //   str = str.replace('\\', '');
  //   // invierto la barra en sentido a '/'
  //   str = str.replace('\\', '/');
  //   // console.log(str);
  //   const URL = 'http://localhost:3000/';
  //   const link = URL + str;
  //   return link;
  // }



//ENVIAR AL REGISTRO LOG LAS PUBLICACIONES
async enviarLog(publicacion: any) {
  console.log('Publicaciones disponibles antes de eliminar:', this.publicaciones);
  const confirmarEliminar = window.confirm('Se guardara este registro en la sección de mascotas adoptadas. ¿Deseas continuar?');

  if (confirmarEliminar) {
    try {
      console.log('ID de la publicación para eliminar:', publicacion.id);
      await this._adopcionesService.eliminarPublicacionLog(publicacion.id).toPromise();

      const index = this.publicaciones.findIndex(p => p.id === publicacion.id);

      if (index !== -1) {
        this.publicaciones.splice(index, 1);
        console.log('Publicación eliminada correctamente');
      } else {
        console.error('No se encontró la publicación');
      }
    } catch (error) {
      console.error('Error al eliminar la publicación', error);
      alert('Error al eliminar la publicación. Por favor, inténtalo de nuevo.');
    }
  }
}



//ELIMINAR LAS PUBLICACIONES
async eliminar(publicacion: any) {
  console.log('Publicaciones disponibles antes de eliminar:', this.publicaciones);
  const confirmarEliminar = window.confirm('Si eliminas esta publicación se perderan todo registro alguno de esta. ¿Estás seguro de que deseas eliminar esta publicación?');

  if (confirmarEliminar) {
    try {
      console.log('ID de la publicación para eliminar:', publicacion.id);
      await this._adopcionesService.eliminarPublicacion(publicacion.id).toPromise();

      const index = this.publicaciones.findIndex(p => p.id === publicacion.id);

      if (index !== -1) {
        this.publicaciones.splice(index, 1);
        console.log('Publicación eliminada correctamente');
      } else {
        console.error('No se encontró la publicación');
      }
    } catch (error) {
      console.error('Error al eliminar la publicación', error);
      alert('Error al eliminar la publicación. Por favor, inténtalo de nuevo.');
    }
  }
}


exportar(event: any) {
  console.log('exportar evento', event.target);
  const img = event.target.files;
  const files = event.target.files;
  console.log(<File>files[0])
  const reader = new FileReader();
  if (img[0].type.split("/")[0] != 'image') {
      // archivo diferente de imagen
      return;
  }
  if (img[0].size > 1048576) {
      // archivo excede el tamaño
      return;
  }

  reader.onloadend = () => {
      let base = reader.result as string;
      this.linkImg = img[0].name;
      console.log(img[0].name);
      console.log(img[0].type.split('/')[1]);
      console.log(base.split('base64,')[1]);

  };
  reader.readAsDataURL(img[0]);
}


OnModificar(id: number): void {
  console.log('ID a modificar:', id);
  const publicacionSeleccionada = this.publicaciones.find(a => a.id === id);

  if (publicacionSeleccionada) {
    console.log(publicacionSeleccionada);
    this._sharedData.data = publicacionSeleccionada;
    // this._router.navigateByUrl('/modificarAdopcion');
    this._router.navigateByUrl(`/modificarAdopcion/${id}`);

  } else {
    console.warn(`No se encontró ninguna publicación con el ID ${id}`);
  }
}

}
