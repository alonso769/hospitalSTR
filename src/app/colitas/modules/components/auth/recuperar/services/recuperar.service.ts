import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';

@Injectable({
  providedIn: 'root'
})
export class RecuperarService {

  // private apiUrl = `http://localhost:3000/api/auth/iniciarsesion`;
  private apiUrlSeguridad = API_COLITAS_ROUTES.SEGURIDAD.RECUPERAR_CONTRASENIA;
  private apiUrlMail = API_COLITAS_ROUTES.MAIL.CAMBIAR_CONTRASENIA;
  constructor(private _http: HttpClient, private _cryptoService: CryptoService) { }

  recuperarCuenta(email: string): Observable<ResponseColitas> {

    return this._http.post<ResponseColitas>(this.apiUrlSeguridad, { email });
  }
  correoCambioContrasenia(url: string, token: string): Observable<ResponseColitas> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.post<ResponseColitas>(this.apiUrlMail, {url}, { headers });
  }
}
