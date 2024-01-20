import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = API_COLITAS_ROUTES.SEGURIDAD.INICIAR_SESION;
  
  constructor(private http: HttpClient) {}

  obtenerInfoUsuario(): Observable<{ isAdmin: boolean }> {
    const url = `${this.apiUrl}/check-admin-status`; // Reemplaza con la ruta de tu API
    // Puedes incluir encabezados de autenticación si es necesario

    return this.http.get<{ isAdmin: boolean }>(url);
  }
}


//Desde aqui se usara como backup