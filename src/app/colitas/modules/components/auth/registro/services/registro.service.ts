import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  // private apiUrl = 'http://localhost:3000/api/auth/crear';
  private apiUrl = API_COLITAS_ROUTES.SEGURIDAD.CREAR_USUARIO;
  constructor(private _http: HttpClient) { }

  crearUsuario(usuario: { nombres: string, apellidos: string, email: string, password: string, rol: string }): Observable<ResponseColitas> {

    return this._http.post<ResponseColitas>(this.apiUrl, usuario);
  }
}
