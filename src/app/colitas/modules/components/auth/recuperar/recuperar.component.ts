import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { RecuperarService } from './services/recuperar.service';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent {
  formRecuperar: FormGroup;
  // recordarSesion: FormControl;
  msgRecuperar: string = '';
  msgError: string = '';
  blockedPanel: boolean = false;

  constructor(public router: Router, private fb: FormBuilder, private _recuperarService: RecuperarService) {
    this.formRecuperar = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
    // this.recordarSesion = new FormControl(false);
  }

  async RecuperarCuenta() {
    try {
      this.blockedPanel = true;
      if (!this.formRecuperar.valid) {
        this.msgRecuperar = 'El correo no existe en nuestros registros';
      }

      const recuperarResponse: ResponseColitas = await this._recuperarService.recuperarCuenta(this.formRecuperar.get('correo').value).toPromise();

      if (!recuperarResponse.ok) {
        this.msgRecuperar = recuperarResponse.msg;
        return;
      }

      console.log(window.location.href);
      const urlPartes = window.location.href.split('/');
      const urlParseada = urlPartes.slice(0, -1).join('/') + '/cambiarcontrasena';
      const urlCambioContrasenia = `${urlParseada}?token=${recuperarResponse.token}`
  
      const correoResponse: ResponseColitas = await this._recuperarService.correoCambioContrasenia(urlCambioContrasenia, recuperarResponse.token).toPromise();

      if (correoResponse.ok) {
        this.msgRecuperar = recuperarResponse.msg;
        return;
      }

    } catch (error) {
      this.msgError = error.msg?error.msg:error;
      throw new Error(error);
    } finally {
      this.blockedPanel= false;
    }
  }
}
