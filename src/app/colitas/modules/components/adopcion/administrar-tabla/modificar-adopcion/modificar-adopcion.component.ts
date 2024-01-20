import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { AdopcionesService } from '../../adopciones/services/adopciones.service';
import { SharedData } from 'src/app/colitas/services/SharedData.service';


@Component({
  selector: 'app-modificar-adopcion',
  templateUrl: './modificar-adopcion.component.html',
  styleUrls: ['./modificar-adopcion.component.scss']
})
export class ModificarAdopcionComponent implements OnInit {

  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';
  blockedPanel: boolean = false;
  public id: number;
  imageSrc: string = '';


  constructor(
    public router: Router,
      private fb: FormBuilder,
        private _sharedData: SharedData,
          private _adopcionesService: AdopcionesService,
            private _activateRoute: ActivatedRoute,
  ) {
    this.formRegistro = this.fb.group({
        nombre: ['', Validators.required],
        edad: ['', Validators.required],
        raza: ['', Validators.required],
        descripcion: ['', Validators.required],
        linkImg: [''],
    });
  }

  private urlImagenes: string = 'http://localhost:3000/images/';
  protected mascotaModificar: any;

  ngOnInit() {
    this.id = +this._activateRoute.snapshot.paramMap.get('id');
    this.obtenerAdopcioniID(this.id);

    // this.formRegistro = this.fb.group({
    //   nombre: [''],
    //   edad: [''],
    //   raza: [''],
    //   descripcion: [''],
    //   linkImg: [''],
    // });

    // this.formRegistro.get('nombre').setValue(this.mascotaModificar.nombre);
    this.formRegistro.get('nombre').disable(); // Deshabilitar el control
    // this.formRegistro.get('edad').setValue(this.mascotaModificar.edad);
    this.formRegistro.get('edad').disable(); // Deshabilitar el control
    // this.formRegistro.get('raza').setValue(this.mascotaModificar.raza);
    this.formRegistro.get('raza').disable(); // Deshabilitar el control
    
  }

  exportar(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.formRegistro.patchValue({
        linkImg: file
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log(this.imageSrc);
      };
      reader.readAsDataURL(file);
    }
  }

  updateSharedData(newData: any[]) {
    this._sharedData.setData(newData);
  }

  extraerNombreDeURL(url: string): string {
    // Suponiendo que la URL siempre sigue el formato http://localhost:3000/images/nombreArchivo
    const partes = url.split('/');
    return partes[partes.length - 1];
  }


  async modificarPublicacion(id: number) {
    try {
      // Obtener la adopción por ID
      await this.obtenerAdopcioniID(id);
  
      // Verificar si hay datos en SharedData y si hay una adopción para modificar
      if (!this._sharedData.data || !this.mascotaModificar.id) {
        console.warn('No hay datos en SharedData o no se encontró una adopción para modificar');
        return;
      }

      // Verificar si el formulario es válido
      if (this.formRegistro.valid) {
        const confirmacion = window.confirm('¿Estás seguro de que deseas modificar la información de la mascota?');

            if (!confirmacion) {
                console.log('Modificación cancelada por el usuario.');
                return;
            }
        // Llamar al método para modificar la adopción por ID
        const adopcionModificada = {
          nombre: this.formRegistro.get('nombre').value,
          edad: this.formRegistro.get('edad').value,
          raza: this.formRegistro.get('raza').value,
          descripcion: this.formRegistro.get('descripcion').value,
          linkImg: this.mascotaModificar.linkImg =this.extraerNombreDeURL(this.mascotaModificar.linkImg),
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
          adopcionModificada.linkImg = file.name;
  
          console.log('Imagen cargada exitosamente:', cargarImagenResponse);
        }

        // Llamar al servicio para modificar la adopción por ID
        const actualizarResponse: ResponseColitas = await this._adopcionesService.modificarPublicacionPorID(this.mascotaModificar.id, adopcionModificada).toPromise();
  
        if (!actualizarResponse.ok) {
          console.error(actualizarResponse.msg);
          return;
        }

        this.router.navigate(['/administrarTabla']);
        console.log('Modificación Exitosa');
      } else {
        console.warn('El formulario no es válido. No se puede realizar la modificación.');
      }
    } catch (error) {
      console.error(error);
    }
  }


  
  async obtenerAdopcioniID(id: number): Promise<void> {
    try {
      const responseColitas: ResponseColitas = await this._adopcionesService.obtenerAdopcionPorId(id).toPromise();
      console.log('Respuesta del servicio:', responseColitas);

      if (responseColitas.data && responseColitas.data.id) {
        const p = responseColitas.data;
        p.linkImg = `${this.urlImagenes}${p.linkimg}`;
        this.mascotaModificar = { ...p };
        console.log('Mascota a modificar:', this.mascotaModificar);
      } else {
        console.warn(`No se encontró ninguna adopción con ID ${id}`);
      }
    } catch (error) {
      console.error("Error al obtener la adopción", error);
    }
  }


}

