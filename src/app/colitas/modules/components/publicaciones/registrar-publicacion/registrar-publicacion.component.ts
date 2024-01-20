import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { PublicacionesService } from '../../../components/publicaciones/services/publicaciones.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/login/services/login.service';
import { AdopcionesService } from '../../adopcion/adopciones/services/adopciones.service';



@Component({
  selector: 'app-registrar-publicacion',
  templateUrl: './registrar-publicacion.component.html',
  styleUrls: ['./registrar-publicacion.component.scss']
})
export class RegistrarPublicacionComponent {

  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';
  blockedPanel: boolean = false;
  imageSrc: string = '';


  constructor(
    public router: Router, 
    private fb: FormBuilder, 
    private _cryptoService: CryptoService, 
    private _publicacionesService: PublicacionesService,
    private http: HttpClient,
    private loginService : LoginService,
    private _adopcionesService:AdopcionesService
    
    ) {
      this.formRegistro = this.fb.group({
        // usuario:['null', Validators.required],
        titulo: ['', Validators.required],
        contenido: ['', Validators.required],
        linkImg: ['null', Validators.required],
      });
    }
    protected usuario: string = '';

    ngOnInit(): void {
      this.usuario = this.ObtenerUsuarioSessionStorage()? this.ObtenerUsuarioSessionStorage().usuario : '';
      console.log(this.ObtenerUsuarioSessionStorage());

      this.formRegistro.get('usuario').setValue(this.usuario);
      this.formRegistro.get('usuario').disable();
    }
  
    ObtenerUsuarioSessionStorage(): any {
      return JSON.parse(sessionStorage.getItem('usuario_login'));
    }

    exportar(event: any) {
      const file = (event.target as HTMLInputElement).files?.[0];
  
      if (file) {
        this.formRegistro.patchValue({
          linkImg: file
        });
  
        // Vista previa de la imagen
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          // console.log(this.imageSrc);
        };
        reader.readAsDataURL(file);
      }
    }

    obtenerTokenDesdeSessionStorage() {
      const token = this.loginService.getTokenFromSessionStorage();
  
      if (token) {
        // Haz algo con el token, por ejemplo, mostrarlo en la consola
        console.log('Token obtenido:', token);
      } else {
        console.log('No se encontró ningún token en sessionStorage');
      }
    }



    async registrarNuevaPublicacion() {
      try {
        const authToken = this.loginService.getTokenFromSessionStorage();
        console.log('Token de autenticación:', authToken);
        if (this.formRegistro.valid) {
          // Objeto sin imagen
          const publicacionesSinImagen = {
            titulo: this.formRegistro.get('titulo').value,
            contenido: this.formRegistro.get('contenido').value,
            linkImg: '',
          };
    
          // Obtener el archivo del formulario
          const fileInput = this.formRegistro.get('linkImg');
          const file = fileInput ? fileInput.value : null;
    
          // Verificar si hay una imagen para cargar
          if (file) {
            // Creacion del FormData para cargar la imagen
            const formData = new FormData();
            formData.append('file', file, file.name);
    
            // Enviar formData al servicio de carga de imágenes
            const cargarImagenResponse = await this._publicacionesService.cargarImagen(formData).toPromise();
    
            // Actualizar el objeto adopciones con el nombre de la imagen
            publicacionesSinImagen.linkImg = file.name;
    
            console.log('Imagen cargada exitosamente:', cargarImagenResponse);
          }
    
          // Enviar datos al servicio de registro sin la imagen
          const crearResponse: ResponseColitas = await this._publicacionesService.registrarPublicacion(publicacionesSinImagen).toPromise();
    
          if (crearResponse.ok) {
            console.log('Mascota registrada exitosamente:', crearResponse);
            this.msgRegistro = 'Mascota registrada exitosamente';

          } else {
            console.error('Error al registrar la mascota:', crearResponse.msg);
            this.msgRegistro = 'Error al registrar la mascota:' + crearResponse.msg;
          }
    
          this.router.navigate(['/publicaciones']);
        } else {
          this.msgRegistro = 'Completar todos los campos antes de enviar la imagen.';
        }
      } catch (error) {
        console.error('No ha iniciado sesión o se produjo un error al registrar la mascota:', error);
        this.msgRegistro = 'No ha iniciado sesión o se produjo un error al registrar la mascota: ';
      }
    }


    //Este obtiene el token 
    // async registrarNuevaPublicacion() {
    //   try {
    //     const authToken = this.loginService.getTokenFromSessionStorage();
    //     console.log('Token de autenticación:', authToken);
    
    //     if (authToken && this.formRegistro.valid) {
    //       const publicacionSinImagen = {
    //         titulo: this.formRegistro.get('titulo').value,
    //         contenido: this.formRegistro.get('contenido').value,
    //         linkImg: '',
    //       };
    
    //       const fileInput = this.formRegistro.get('linkImg');
    //       const file = fileInput ? fileInput.value : null;
    
    //       if (file) {
    //         const formData = new FormData();
    //         formData.append('imagen', file, file.name);
    
    //         try{
    //         const cargarImagenResponse = await this._publicacionesService.cargarImagen(formData, authToken).toPromise();
    //         console.log('Imagen cargada exitosamente:', cargarImagenResponse);

    //         publicacionSinImagen.linkImg = file.name;
    //         console.log('Imagen cargada exitosamente:', cargarImagenResponse);
    //         }catch (error) {
    //           console.error('Error al cargar la imagen:', error);
    //           this.msgRegistro = 'Error al cargar la imagen: ' + (error.message || 'Error desconocido');
    //           return; 
    //         }
    //       }
    
    //       const crearResponse: ResponseColitas = await this._publicacionesService.registrarPublicacion(publicacionSinImagen).toPromise();
    
    //       if (crearResponse.ok) {
    //         console.log('Publicación registrada exitosamente:', crearResponse);
    //         this.msgRegistro = 'Publicación registrada exitosamente';
    //       } else {
    //         console.error('Error al registrar la publicación:', crearResponse);
    //         this.msgRegistro = 'Error al registrar la publicación: ' + crearResponse.msg;
    //       }
    
    //       this.router.navigate(['/administrarTabla']);
    //     } else {
    //       this.msgRegistro = 'Completar todos los campos antes de enviar la imagen o El usuario no se encuentra autenticado.';
    //     }
    //   } catch (error) {
    //     console.error('Error al registrar la publicación', error);
    //     this.msgRegistro = 'Error al registrar la publicación';
    //   }
    // }
    





//Este solo manda la imagen a la ruta---------------------------------------------------------------------------------ESTE ES EL BUENO EL BACKUP
    // async registrarNuevaPublicacion() {
    //   try {
    //     if (this.formRegistro.valid) {
    //       // Objeto sin imagen
    //       const publicacionesSinImagen = {
    //         titulo: this.formRegistro.get('titulo').value,
    //         contenido: this.formRegistro.get('contenido').value,
    //         linkImg: '',
    //       };
    
    //       // Obtener el archivo del formulario
    //       const fileInput = this.formRegistro.get('linkImg');
    //       const file = fileInput ? fileInput.value : null;
    
    //       // Verificar si hay una imagen para cargar
    //       if (file) {
    //         // Creacion del FormData para cargar la imagen
    //         const formData = new FormData();
    //         formData.append('file', file, file.name);
    
    //         // Enviar formData al servicio de carga de imágenes
    //         const cargarImagenResponse = await this._publicacionesService.cargarImagen(formData).toPromise();
    
    //         // Actualizar el objeto adopciones con el nombre de la imagen
    //         publicacionesSinImagen.linkImg = file.name;
    
    //         console.log('Imagen cargada exitosamente:', cargarImagenResponse);
    //       }
    
    //       // Enviar datos al servicio de registro sin la imagen
    //       const crearResponse: ResponseColitas = await this._publicacionesService.registrarPublicacion(publicacionesSinImagen).toPromise();
    
    //       if (crearResponse.ok) {
    //         console.log('Mascota registrada exitosamente:', crearResponse);
    //         this.msgRegistro = 'Mascota registrada exitosamente';

    //       } else {
    //         console.error('Error al registrar la mascota:', crearResponse.msg);
    //         this.msgRegistro = 'Error al registrar la mascota: ' + crearResponse.msg;
    //       }
    
    //       this.router.navigate(['/administrarTabla']);
    //     } else {
    //       this.msgRegistro = 'Completar todos los campos antes de enviar la imagen.';
    //     }
    //   } catch (error) {
    //     console.error('Error al registrar la mascota', error);
    //     this.msgRegistro = 'Error al registrar la mascota';
    //   }
    // }


  }
  
