import { Component, OnInit } from '@angular/core';
import { AdopcionesService } from '../../adopcion/adopciones/services/adopciones.service';
import { SharedData } from 'src/app/colitas/services/SharedData.service';
import { Router } from '@angular/router';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { LoginService } from '../../auth/login/services/login.service';


@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.scss']
})
export class AdopcionesComponent implements OnInit {
  visible: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;
  public id: number;
  
  

  encargado: string;


  esAdmin: boolean = false;

  // bloquearCard: boolean = false;
  // private tarjetasBloqueadas: Record<number, boolean> = {};
  private tarjetasBloqueadas: { [id: number]: boolean } = JSON.parse(localStorage.getItem('tarjetasBloqueadas')) || {};


  adopcionInvalidada: boolean = false;

  // private urlImagenes: string = '../assets/colitas/adopciones/';
  private urlImagenes: string = 'http://localhost:3000/images/';

  protected publicaciones: any[] = [];
  blockedPanel: boolean = false;

  nombreImagen: string = "ximena";

  showDialog() {
    this.visible = true;
  }

  constructor(private _adopcionesService: AdopcionesService, private _sharedData: SharedData, private _router: Router, private _loginService: LoginService) {this.tarjetasBloqueadas = {}; }

  protected rol: string = '';

  toggleBloquearCard(id: number) {
    // Cambiamos el estado de bloqueo de la tarjeta con el ID proporcionado
    this.tarjetasBloqueadas[id] = !this.tarjetasBloqueadas[id];
    // Actualizamos el localStorage
    this.actualizarLocalStorage();
  }

bloquearCard(id: number) {
    this.tarjetasBloqueadas = this.tarjetasBloqueadas || {};
    this.tarjetasBloqueadas[id] = true;
    this.actualizarLocalStorage();
}

desbloquearCard(id: number) {
    this.tarjetasBloqueadas = this.tarjetasBloqueadas || {};
    this.tarjetasBloqueadas[id] = false;
    this.actualizarLocalStorage();
}
  
  // Función para verificar si una tarjeta está bloqueada
  esTarjetaBloqueada(id: number): boolean {
    return !!this.tarjetasBloqueadas[id];
  }
  
  // Función para actualizar el localStorage
  private actualizarLocalStorage() {
    localStorage.setItem('tarjetasBloqueadas', JSON.stringify(this.tarjetasBloqueadas));
  }


  ngOnInit() {
    this.tarjetasBloqueadas = JSON.parse(localStorage.getItem('tarjetasBloqueadas')) || {};

    const storedTarjetasBloqueadas = localStorage.getItem('tarjetasBloqueadas');
    if (storedTarjetasBloqueadas) {
      this.tarjetasBloqueadas = JSON.parse(storedTarjetasBloqueadas);
    }

    this.obtenerAdopciones();

    this.rol = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().rol : '';
    console.log(this.ObtenerUsuarioSessionStorage())

    const usuarioSession = this.ObtenerUsuarioSessionStorage();

    if (usuarioSession && usuarioSession.rol === 'Admin') {
      this.rol = usuarioSession.rol;
    } else {
      this.rol = '';
    }

    console.log(usuarioSession);
  }

  ngOnDestroy() {
    // Llamado cuando el componente se destruye, por ejemplo, al cerrar la página
    this.actualizarLocalStorage();
  }

  // invalidarAdopcion() {
  //   // Lógica para invalidar la adopción
  //   // Supongamos que estamos enviando una solicitud a la API para invalidar la adopción
  //   this._adopcionesService.obtenerAdopcionPorId(this.id).subscribe(
  //     () => {
  //       // Cambiar el estado adopcionInvalidada a true
  //       this.adopcionInvalidada = true;

  //       // Después, bloquear el card
  //       this.bloquearCard = true;
  //     },
  //     error => {
  //       console.error('Error al invalidar adopción:', error);
  //     }
  //   );
  // }

  ObtenerUsuarioSessionStorage(): any {
    return JSON.parse(sessionStorage.getItem('usuario_login'));
  }

  async obtenerAdopciones() {
    try {
      const responseColitas: ResponseColitas = await this._adopcionesService.obtenerAdopciones().toPromise();

      responseColitas.data.forEach(p => {
        p.linkImg = `${this.urlImagenes}${p.img}`;
        p.id = p.codigo;
        // p.fechaPublicacion = `${this.formatoFechasPublicacion(p.fechaPublicacion)}`
        this.publicaciones.push({ ...p });
      });

      console.log(this.publicaciones);

      // this.verificarRolAdmin();

    } catch (error) {
      console.error("Error al obtener las adopciones", error);
    }
  }


  // verificarRolAdmin() {
  //   // Llamar a tu servicio de login para obtener información sobre el usuario
  //   this._loginService.obtenerInformacionUsuario().subscribe(
  //     (usuario) => {
  //       // Verificar si el usuario es administrador y actualizar la variable esAdmin
  //       this.esAdmin = usuario.rol === 'admin';
  //     },
  //     (error) => {
  //       console.error('Error al obtener información del usuario:', error);
  //     }
  //   );
  // }


  //Este
  // OnAdoptar(id: number): void {
  //   console.log(this.publicaciones.filter(a => a.id === id)[0]);
  //   this._sharedData.data = this.publicaciones.filter(a => a.id === id)[0];

  //   this._router.navigateByUrl('adopciones/adoptar')
  // }



  // OnAdoptar(id: number): void {
  //   const publicacionSeleccionada = this.publicaciones.find(a => a.id === id);

  //   if (publicacionSeleccionada) {
  //     console.log(publicacionSeleccionada);
  //     this._sharedData.data = publicacionSeleccionada;
  //     this._router.navigateByUrl('/adoptar');
  //   } else {
  //     console.warn(`No se encontró ninguna publicación con el ID ${id}`);
  //   }
  // }


  OnAdoptar(id: number): void {
    console.log('ID a adoptar:', id);
    const publicacionSeleccionada = this.publicaciones.find(u => u.id === id);

    if (publicacionSeleccionada) {
      console.log(publicacionSeleccionada);
      this._sharedData.data = publicacionSeleccionada;

      // Navegar a la ruta con el parámetro "id"
      this._router.navigate(['/adopciones/adoptar', id]);

    } else {
      console.warn(`No se encontró ninguna publicación con el ID ${id}`);
    }
  }


}