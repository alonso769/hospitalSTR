import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private apiUrl = API_COLITAS_ROUTES.SEGURIDAD.CERRAR_SESION;

  constructor(private http: HttpClient) { }


  cerrarSesion(): Observable<any> {
    return this.http.post(this.apiUrl, null);
  }

}
