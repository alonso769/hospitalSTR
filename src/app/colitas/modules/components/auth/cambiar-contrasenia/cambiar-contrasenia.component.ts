import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { CambiarContraseniaService } from './services/cambiar-contrasenia.service';
import { ResponseColitas } from 'src/app/colitas/models/response';


@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.scss'],
})
export class CambiarContraseniaComponent implements OnInit {
  formCambiarContrasenia: FormGroup;
  recordarSesion: FormControl;
  msgCambiarContrasenia: string = '';
  private token: string = '';
  blockedPanel: boolean = false;

  constructor(public router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder, private _cryptoService: CryptoService, private _cambiarContraseñaService: CambiarContraseniaService) {
    this.formCambiarContrasenia = this.fb.group({
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ],
      contraseniaConfirmar: [
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

  ngOnInit(): void {
    const fragment = window.location.hash.substring(1);
    this.token = fragment.split('?token=')[1];
    console.log('Token:', this.token);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      this.token = urlParams.get('token');
  
      if (!this.token) {
        throw new Error('Token not found in URL');
      }
  
      console.log('Token:', this.token);
    } catch (error) {
      console.error('Error extracting token:', error);
    }

  }

  async cambiarContrasenia() {
    try {
      this.blockedPanel = true;
      if (!this.formCambiarContrasenia.valid) {
        this.msgCambiarContrasenia = 'Correo y/o contraseña incorrectos.';
      }

      const contrasenia: string = this.formCambiarContrasenia.get('contrasenia').value;
      const contrasenia_confirmar: string = this.formCambiarContrasenia.get('contraseniaConfirmar').value;
      const cambioResponse: ResponseColitas = await this._cambiarContraseñaService.cambioContrasenia(contrasenia, contrasenia_confirmar, this.token).toPromise()

      if (!cambioResponse.ok) {
        this.msgCambiarContrasenia = cambioResponse.msg;
        return;
      }

      this.router.navigateByUrl('/auth/login');
    } catch (error) {
      throw new Error(error);
    }finally{
      this.blockedPanel= false;
    }
  }
}
