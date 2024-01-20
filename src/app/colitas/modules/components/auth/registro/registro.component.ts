import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { RegistroService } from './services/registro.service';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';
  blockedPanel: boolean = false;
  
  constructor(public router: Router, private fb: FormBuilder, private _cryptoService: CryptoService, private _registroService: RegistroService) {
    this.formRegistro = this.fb.group({
      nombres: ['',
        // Validators.required,
        // Validators.pattern('[a-z], [A-Z]')
      ],
      apellidos: [''],
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
  }

  async crearUsuario() {
    try {
      this.blockedPanel = true;
      if (!this.formRegistro.valid) {
        this.msgRegistro = 'Correo y/o contraseña incorrectos.';
      }

      const usuario = {
        nombres: this.formRegistro.get('nombres').value,
        apellidos: this.formRegistro.get('apellidos').value,
        email: this.formRegistro.get('correo').value,
        password: this.formRegistro.get('contrasenia').value,
        rol: 'Usuario'
      }

      const crearResponse: ResponseColitas = await this._registroService.crearUsuario(usuario).toPromise();

      if (!crearResponse.ok) {
        this.msgRegistro = crearResponse.msg;
        return;
      }

      //Encriptar
        this.guardarTokenSessionStorage(crearResponse.token);

        this.router.navigateByUrl('/auth/login');

    } catch (error) {
      this.msgError = error.msg?error.msg:error;
        throw new Error(error);
    } finally {
        this.blockedPanel = false;
    }
  }

  guardarTokenSessionStorage(token: string = ''): void {
    const datosEncriptados: string = this._cryptoService.encrypt(token);
    if (datosEncriptados) sessionStorage.setItem('token_session', datosEncriptados);
  }
}
