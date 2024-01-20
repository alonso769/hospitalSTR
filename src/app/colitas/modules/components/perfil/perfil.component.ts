import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../auth/login/services/login.service';
import { SharedData } from 'src/app/colitas/services/SharedData.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],

  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('void <=> *', animate('600ms ease-in-out'))
    ])
  ]
})
export class PerfilComponent implements OnInit {

  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';
  blockedPanel: boolean = false;
  imageSrc: string = '';
  mostrarFormularioFlag = false;


  constructor(
    public router: Router,
      private fb: FormBuilder,
        private _cryptoService: CryptoService,
          private _http: HttpClient,
            private _loginService: LoginService,
              private _activateRoute: ActivatedRoute,
                private _sharedData: SharedData
  ) {
    this.formRegistro = this.fb.group({
      // id:['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  usuarioLogeado: any;
  correoUsuario: any;


  public id: number;
  protected usuario: string = '';
  protected rol: string = '';
  protected email: string = '';
  protected nombres: string = '';
  protected apellidos: string = '';

  protected usuarioModificar: any;


  ngOnInit(): void {

    this.id = +this._activateRoute.snapshot.paramMap.get('id');
    this.obtenerUsuario(this.id);

    // //Obtener Informacion de consola del inicio de sesion y mostrarla
    // this.usuario = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().usuario : '';
    // // console.log(this.ObtenerUsuarioSessionStorage());
    // this.rol = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().rol : '';
    // this.email = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().email : '';
    // this.nombres = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().nombres : '';

    
    // this.apellidos = this.ObtenerUsuarioSessionStorage() ? this.ObtenerUsuarioSessionStorage().apellidos : '';

    // this.formRegistro.get('nombres').disable();
    // this.formRegistro.get('apellidos').disable();
    // this.formRegistro.get('email').disable();
    // this.formRegistro.get('rol').disable(); // Deshabilitar el control después de obtener la información del usuario
    this.formRegistro.get('rol').disable();

  }

  // updateSharedData(newData: any[]) {
  //   this._sharedData.setData(newData);
  // }

  mostrarFormulario() {
    this.mostrarFormularioFlag = true;
  }

  cerrarFormulario() {
    this.mostrarFormularioFlag = false;
  }

  // ObtenerUsuarioSessionStorage(): any {
  //   return JSON.parse(sessionStorage.getItem('usuario_login'));
  // }

  //OK
  async obtenerUsuario(id: number): Promise<void> {
    try {
      const responseColitas: ResponseColitas = await this._loginService.obtenerUsuarioPorId(id).toPromise();
      console.log('Respuesta del servicio:', responseColitas);

      if (responseColitas.data && responseColitas.data.id) {
        const p = responseColitas.data;
        this.usuarioModificar = { ...p };

        // Set user information properties
        this.usuario = p.usuario;
        this.rol = p.rol;
        this.email = p.correo;
        this.nombres = p.nombres;
        this.apellidos = p.apellidos;

        console.log('Usuario a modificar:', this.usuarioModificar);
      } else {
        console.warn(`No se encontró ninguna adopción con ID ${id}`);
      }
    } catch (error) {
      console.error("Error al obtener la adopción", error);
    }
  }


  async modificarInformacionUsuario(id: number) {
    try {
      // Obtener la adopción por ID
      await this.obtenerUsuario(id);

      // Verificar si hay datos en SharedData y si hay una adopción para modificar
      if (!this._sharedData.data || !this.usuarioModificar.id) {
        console.warn('No hay datos en SharedData o no se encontró una adopción para modificar');
        return;
      }

      // Verificar si el formulario es válido
      if (this.formRegistro.valid) {
        const confirmacion = window.confirm('¿Estás seguro de que deseas modificar la información del Usuario?');

        if (!confirmacion) {
          console.log('Modificación cancelada por el usuario.');
          return;
        }
        // Llamar al método para modificar la adopción por ID
        const usuarioModificado = {
          nombres: this.formRegistro.get('nombres').value,
          apellidos: this.formRegistro.get('apellidos').value,
          email: this.formRegistro.get('correo').value,
          rol: this.formRegistro.get('rol').value,
        };

        console.log('Datos a enviar:', usuarioModificado); // Agregar esta línea para imprimir los datos antes de enviar la solicitud

        

        // Llamar al servicio para modificar la adopción por ID
        const actualizarResponse: ResponseColitas = await this._loginService.modificarUsuarioID(this.usuarioModificar.id, usuarioModificado).toPromise();

        if (!actualizarResponse.ok) {
          console.error(actualizarResponse.msg);
          return;
        }

        console.log('Datos modificados con éxito:', usuarioModificado);


        
        // this.router.navigate(['/MiPerfil']);
        this.router.navigateByUrl(`/MIperfil/${id}`);
        // // this.location.reload();
        window.location.reload();

        console.log('Modificación Exitosa');
      } else {
        console.warn('El formulario no es válido. No se puede realizar la modificación.');
      }
    } catch (error) {
      console.error(error);
    }
  }

}