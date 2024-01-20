import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { AdopcionesService } from '../../adopciones/services/adopciones.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registrar-adopcion',
  templateUrl: './registrar-adopcion.component.html',
  styleUrls: ['./registrar-adopcion.component.scss']
})
export class RegistrarAdopcionComponent {
  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';
  blockedPanel: boolean = false;
  imageSrc: string = '';


  constructor(
    public router: Router, 
    private fb: FormBuilder, 
    private _cryptoService: CryptoService, 
    private _adopcionesService: AdopcionesService,
    private http: HttpClient
    ) {
      this.formRegistro = this.fb.group({
        // Define tus controles de formulario aquí
        nombre: ['', Validators.required],
        edad: ['', Validators.required],
        raza: ['', Validators.required],
        descripcion: ['', Validators.required],
        linkImg: ['null', Validators.required], // Este control es para la imagen
        encargado: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['', Validators.required],
      });
    }
  
    ngOnInit(): void {}
  
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
          console.log(this.imageSrc);
        };
        reader.readAsDataURL(file);
      }
    }


    // Solo envia el archivo al backend, no registra la informacion
    // async registrarMascotaAdopcion() {
    //   try {
    //     // Verificar si el formulario es válido antes de enviar la imagen
    //     if (this.formRegistro.valid) {
    //       const formData = new FormData();
    
    //       // Agregar otros campos del formulario al formData si es necesario
    //       formData.append('nombre', this.formRegistro.get('nombre').value);
    //       formData.append('edad', this.formRegistro.get('edad').value);
    //       formData.append('raza', this.formRegistro.get('raza').value);
    //       formData.append('descripcion', this.formRegistro.get('descripcion').value);
    
    //       // Agregar la imagen al formData
    //       const file = this.formRegistro.get('linkImg').value;
    //       formData.append('file', file, file.name);
    
    //       // Enviar formData al servicio de carga de imágenes
    //       const response = await this._adopcionesService.cargarImagen(formData).toPromise();
    
    //       // Manejar la respuesta exitosa, si es necesario
    //       console.log('Imagen cargada exitosamente', response);
    //       this.msgRegistro = 'Imagen cargada exitosamente';
    
    //       this.router.navigate(['/administrarTabla']);
    //     } else {
    //       this.msgRegistro = 'Por favor, complete todos los campos antes de enviar la imagen.';
    //     }
    //   } catch (error) {
    //     // Manejar el error, si es necesario
    //     console.error('Error al cargar la imagen', error);
    //     this.msgRegistro = 'Error al cargar la imagen';
    //   }
    // }


// Manda informacion a la bd como [object object] Si envia el archivo al backend
    // async registrarMascotaAdopcion() {
    //   try {
    //     // Verificar si el formulario es válido antes de enviar la imagen
    //     if (this.formRegistro.valid) {
    //       const adopciones = {
    //         nombre: this.formRegistro.get('nombre').value,
    //         edad: this.formRegistro.get('edad').value,
    //         raza: this.formRegistro.get('raza').value,
    //         descripcion: this.formRegistro.get('descripcion').value,
    //         linkImg: this.formRegistro.get('linkImg').value,
    //       };
    
    //       // Enviar datos al servicio de registro
    //       const crearResponse: ResponseColitas = await this._adopcionesService.registrarPublicacion(adopciones).toPromise();
    
    //       // Manejar la respuesta del servicio de registro
    //       if (crearResponse.ok) {
    //         // Manejar la respuesta exitosa, si es necesario
    //         console.log('Mascota registrada exitosamente:', crearResponse);
    //         this.msgRegistro = 'Mascota registrada exitosamente';
    
    //         // Continuar con la carga de la imagen si es necesario
    //         const formData = new FormData();
    //         formData.append('file', this.formRegistro.get('linkImg').value);
    
    //         const cargarImagenResponse = await this._adopcionesService.cargarImagen(formData).toPromise();
    
    //         // Manejar la respuesta de carga de imagen, si es necesario
    //         console.log('Imagen cargada exitosamente:', cargarImagenResponse);
    //       } else {
    //         // Manejar el caso en que el registro no fue exitoso
    //         console.error('Error al registrar la mascota:', crearResponse.msg);
    //         this.msgRegistro = 'Error al registrar la mascota: ' + crearResponse.msg;
    //       }
    
    //       // Navegar a la página de administración
    //       this.router.navigate(['/administrarTabla']);
    //     } else {
    //       // Manejar el caso en que el formulario no es válido
    //       this.msgRegistro = 'Por favor, complete todos los campos antes de enviar la imagen.';
    //     }
    //   } catch (error) {
    //     // Manejar errores generales
    //     console.error('Error al registrar la mascota', error);
    //     this.msgRegistro = 'Error al registrar la mascota';
    //   }
    // }


    //De esta forma es separando registrarmascotaadopcion y cargar imagen
    // async registrarMascotaAdopcion() {
    //   try {
    //     // Verificar si el formulario es válido antes de enviar la imagen
    //     if (this.formRegistro.valid) {
    //       // Enviar datos al servicio de carga de imágenes y obtener la URL
    //       const urlImagen = await this.cargarImagen();
    
    //       // Verificar si la carga de la imagen fue exitosa
    //       if (urlImagen) {
    //         // Crear el objeto adopciones con la URL de la imagen
    //         const adopciones = {
    //           nombre: this.formRegistro.get('nombre').value,
    //           edad: this.formRegistro.get('edad').value,
    //           raza: this.formRegistro.get('raza').value,
    //           descripcion: this.formRegistro.get('descripcion').value,
    //           linkImg: urlImagen,
    //         };
    
    //         // Enviar datos al servicio de registro
    //         const crearResponse: ResponseColitas = await this._adopcionesService.registrarPublicacion(adopciones).toPromise();
    
    //         // Manejar la respuesta del servicio de registro
    //         if (crearResponse.ok) {
    //           // Manejar la respuesta exitosa, si es necesario
    //           console.log('Mascota registrada exitosamente:', crearResponse);
    //           this.msgRegistro = 'Mascota registrada exitosamente';
    
    //           // Navegar a la página de administración
    //           this.router.navigate(['/administrarTabla']);
    //         } else {
    //           // Manejar el caso en que el registro no fue exitoso
    //           console.error('Error al registrar la mascota:', crearResponse.msg);
    //           this.msgRegistro = 'Error al registrar la mascota: ' + crearResponse.msg;
    //         }
    //       } else {
    //         // Manejar el caso en que la carga de la imagen falló
    //         console.error('Error al cargar la imagen');
    //         this.msgRegistro = 'Error al cargar la imagen';
    //       }
    //     } else {
    //       // Manejar el caso en que el formulario no es válido
    //       this.msgRegistro = 'Por favor, complete todos los campos antes de enviar la imagen.';
    //     }
    //   } catch (error) {
    //     // Manejar errores generales
    //     console.error('Error al registrar la mascota', error);
    //     this.msgRegistro = 'Error al registrar la mascota';
    //   }
    // }
    

    // async cargarImagen(): Promise<string | null> {
    //   try {
    //     const file = this.formRegistro.get('linkImg').value;
    
    //     if (file) {
    //       const formData = new FormData();
    //       formData.append('file', file);
    
    //       const response: any = await this._adopcionesService.cargarImagen(formData).toPromise();
    
    //       if (response && response.ok) {
    //         console.log('Imagen cargada exitosamente', response);
    //         return response.url;
    //       } else {
    //         console.error('Error al cargar la imagen:', response);
    //         this.msgRegistro = 'Error al cargar la imagen. Por favor, intenta de nuevo.';
    //         return null;
    //       }
    //     } else {
    //       console.error('No se ha seleccionado ninguna imagen');
    //       this.msgRegistro = 'No se ha seleccionado ninguna imagen';
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error('Error al cargar la imagen', error);
    //     this.msgRegistro = 'Error al cargar la imagen. Por favor, intenta de nuevo.';
    //     return null;
    //   }
    // }


    async registrarMascotaAdopcion() {
      try {
        if (this.formRegistro.valid) {
          // Objeto sin imagen
          const adopcionesSinImagen = {
            nombre: this.formRegistro.get('nombre').value,
            edad: this.formRegistro.get('edad').value,
            raza: this.formRegistro.get('raza').value,
            descripcion: this.formRegistro.get('descripcion').value,
            encargado: this.formRegistro.get('encargado').value,
            dni: this.formRegistro.get('dni').value,
            telefono: this.formRegistro.get('telefono').value,
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
            const cargarImagenResponse = await this._adopcionesService.cargarImagen(formData).toPromise();
    
            // Actualizar el objeto adopciones con el nombre de la imagen
            adopcionesSinImagen.linkImg = file.name;
    
            console.log('Imagen cargada exitosamente:', cargarImagenResponse);
          }
    
          // Enviar datos al servicio de registro sin la imagen
          const crearResponse: ResponseColitas = await this._adopcionesService.registrarPublicacion(adopcionesSinImagen).toPromise();
    
          if (crearResponse.ok) {
            console.log('Mascota registrada exitosamente:', crearResponse);
            this.msgRegistro = 'Mascota registrada exitosamente';

          } else {
            console.error('Error al registrar la mascota:', crearResponse.msg);
            this.msgRegistro = 'Error al registrar la mascota: ' + crearResponse.msg;
          }
    
          this.router.navigate(['/administrarTabla']);
        } else {
          this.msgRegistro = 'Completar todos los campos antes de enviar la imagen.';
        }
      } catch (error) {
        console.error('Error al registrar la mascota', error);
        this.msgRegistro = 'Error al registrar la mascota';
      }
    }
  }

