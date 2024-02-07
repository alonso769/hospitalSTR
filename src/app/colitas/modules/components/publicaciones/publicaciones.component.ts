import { Component, OnInit } from '@angular/core';
import { differenceInDays, differenceInWeeks } from 'date-fns';
import { PublicacionesService } from './services/publicaciones.service';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


// interface Distrito {
//     name: string;
// }

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  visible: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;


  private urlImagenes: string = 'http://localhost:3000/images/';
  protected publicaciones: any[] = [];
  blockedPanel: boolean = false;

  nombreImagen: string = "ximena";
  constructor(private _publicacionesService: PublicacionesService, public router: Router) { }

  protected usuario: string = '';
  protected rol: string = '';
  esAdmin:boolean =false;

  ngOnInit() {
    this.obtenerPublicaciones();

    // this.usuario = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().usuario : '';
    // console.log(this.ObtenerUsuarioSessionStorage())

    const usuarioSession = this.ObtenerUsuarioSessionStorage();

    if (usuarioSession) {
      this.usuario = usuarioSession.usuario;
      this.rol = usuarioSession.rol;

      this.esAdmin = this.rol === 'Admin';


      if (this.rol === 'admin') {
        // El usuario es admin, no necesitas filtrar las publicaciones
      } else if (this.rol === 'usuario') {
        // Filtrar las publicaciones del usuario actual
        this.publicaciones = this.publicaciones.filter(p => p.usuario === this.usuario);
      }
    }
  }

  esPublicacionDelUsuarioActual(publicacion: any): boolean {
    if (!publicacion.usuario) {
      console.warn('La publicación no tiene una propiedad "usuario".');
      return false;
    }
  
    const normalizeString = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
    const usuarioPublicacion = normalizeString(publicacion.usuario);
    const usuarioActual = normalizeString(this.usuario);
  
    // console.log('publicacion.usuario:', usuarioPublicacion);
    // console.log('this.usuario:', usuarioActual);
    // console.log('Longitud de usuarioPublicacion:', usuarioPublicacion.length);
    // console.log('Longitud de usuarioActual:', usuarioActual.length);
  
    const result = usuarioPublicacion === usuarioActual;
    console.log('Resultado de esPublicacionDelUsuarioActual:', result);
  
    return result;
  }


  ObtenerUsuarioSessionStorage(): any {
    return JSON.parse(sessionStorage.getItem('usuario_login'));
  }

  // showDialog() {
  //     this.visible = true;
  // }
  async obtenerPublicaciones() {
    try {
      const responseColitas: ResponseColitas = await this._publicacionesService.obtenerPublicaciones().toPromise();

      responseColitas.data.forEach(p => {
        p.linkDoc = `${this.urlImagenes}${p.doc}`;
        p.usuario = p.usuariocreador;
        // p.fechaPublicacion = `${this.formatoFechasPublicacion(p.fechaPublicacion)}`
        p.fechaPublicacion = p.fecha;
        p.id = p.codigo;
        this.publicaciones.push({ ...p });
      });

      console.log(this.publicaciones);
    } catch (error) {
      console.error("Error al obtener las publicaciones", error);
    }
  }

  // hideDialog() {
  //     this.productDialog = false;
  //     this.submitted = false;
  //     // this.visible = false;
  // }

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
      this.nombreImagen = img[0].name;
      console.log(img[0].name);
      console.log(img[0].type.split('/')[1]);
      console.log(base.split('base64,')[1]);

    };
    reader.readAsDataURL(img[0]);
  }


  async eliminar(publicacion: any) {
    console.log('Publicaciones disponibles antes de eliminar:', this.publicaciones);
    const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar esta publicación?');

    if (confirmarEliminar) {
      try {
        console.log('ID de la publicación para eliminar:', publicacion);
        await this._publicacionesService.eliminarPublicacion(publicacion).toPromise();

        const index = this.publicaciones.findIndex(p => p.id === publicacion);

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

}
