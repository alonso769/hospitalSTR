import { Component, OnInit } from '@angular/core';
import { AdopcionesService } from '../../adopcion/adopciones/services/adopciones.service';
import { SharedData } from 'src/app/colitas/services/SharedData.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { AdoptarService } from './services/adoptar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adoptar',
  templateUrl: './adoptar.component.html',
  styleUrls: ['./adoptar.component.scss']
})
export class AdoptarComponent implements OnInit {

  images: any[] | undefined;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  nombre: string;
  edad: string;
  raza: string;
  descripcion : string;
  linkImg : string;

  private urlImagenes: string = 'http://localhost:3000/images/';

  // protected publicaciones: any;
  protected mascotaAdoptar: any;
  blockedPanel: boolean = false;
  public id: number;

  constructor(
    private _adopcionesService: AdopcionesService,
    private _sharedData: SharedData,
    private _activateRoute: ActivatedRoute,
    private _adoptarService: AdoptarService,
    private router: Router
  ) {}
  

  ngOnInit() {
    this.id = +this._activateRoute.snapshot.paramMap.get('id');

    if (!isNaN(this.id)) {
      this.obtenerAdopcioniID(this.id);
    } else {
      console.warn('No se proporcionó un ID en la URL. Manejar caso sin ID aquí.');
    }
  }

  imagenNoCargada() {
    console.error('Error al cargar la imagen.');
  }

  formularioAdopcion() {
    const confirmacion = confirm('¿Estás seguro de que deseas adoptar esta mascota?');
  
    if (confirmacion) {
      const paginaFacebook = 'https://docs.google.com/forms/d/e/1FAIpQLSfbrpexFGmbmPQ3hAN5lcA9qww6SullPyviebc5bSyiZw3NCQ/viewform';
  
      window.open(paginaFacebook, '_blank');
  
      setTimeout(() => {
        alert('¡GRACIAS por adoptar!');
      }, 2000);
    }
  }

  volver() {
    const confirmacion = confirm('¿Estás seguro de que quieres volver al catálogo?');
    if (confirmacion) {
      this.router.navigate(['/adopciones']); // Navega hacia la ruta '/adopciones'
    }
  }


  async obtenerAdopcioniID(id: number) {
    try {
      const responseColitas: ResponseColitas = await this._adopcionesService.obtenerAdopcionPorId(id).toPromise();
      console.log('Respuesta del servicio:', responseColitas);

      if (responseColitas.data && responseColitas.data.id) {
        const p = responseColitas.data;
        p.linkImg = `${this.urlImagenes}${p.linkimg}`;
        this.mascotaAdoptar = { ...p };
        console.log('Mascota a modificar:', this.mascotaAdoptar);
      } else {
        console.warn(`No se encontró ninguna adopción con ID ${id}`);
      }
    } catch (error) {
      console.error("Error al obtener la adopción", error);
    }
  }
}
