import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { LoginService } from './services/login.service';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  formLogin: FormGroup;
  recordarSesion: FormControl;
  msgLogin: string = '';
  blockedPanel: boolean = false;
  esAdmin:boolean=false;
  

  constructor(public router: Router, private fb: FormBuilder, private _cryptoService: CryptoService, private _loginService: LoginService, private _http: HttpClient) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ],
    });

    this.recordarSesion = new FormControl(false);
  }

  async iniciarSesion() {
    try {
      this.blockedPanel = true;
      if (!this.formLogin.valid) {
        this.msgLogin = 'Correo y/o contraseña incorrectos.';
      }

      const usuario = {
        email: this.formLogin.get('correo').value,
        password: this.formLogin.get('contrasenia').value
      }

      const sesionColitas: ResponseColitas = await this._loginService.iniciarSesion(usuario).toPromise();
      // console.log('Respuesta del inicio de sesión:', sesionColitas);


      if (!sesionColitas.ok) {
        this.msgLogin = sesionColitas.msg;
        return;
      }

      const rolUsuario = sesionColitas.data.rol;
      console.log('Rol del usuario:', rolUsuario);

      this.esAdmin = rolUsuario === 'admin';
      console.log('Es administrador:', this.esAdmin);

      //Encriptar
      this.guardarTokenSessionStorage(sesionColitas.token);
      this.guardarTokenLocalStorage(sesionColitas.token);
      this.guardarUsuarioSessionStorage(sesionColitas.data);
      this.router.navigateByUrl('/');

    } catch (error) {
      throw new Error(error);
    } finally {
      this.blockedPanel = false;
    }
  }

  guardarTokenSessionStorage(token: string = ''): void {
    const datosEncriptados: string = this._cryptoService.encrypt(token);
    if (datosEncriptados) sessionStorage.setItem('token_session', datosEncriptados);
  }
  guardarUsuarioSessionStorage(usuario: any): void {
    sessionStorage.setItem('usuario_login', JSON.stringify(usuario));
  }

  guardarTokenLocalStorage(token: string = ''): void {
    if (this.recordarSesion.value) {
      const datosEncriptados: string = this._cryptoService.encrypt(token);
      if (datosEncriptados) localStorage.setItem('token_session', datosEncriptados);
    }
  }

}
