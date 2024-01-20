import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Injectable({
  providedIn: 'root'
})
export class AdoptarService {

  // private apiUrl = API_COLITAS_ROUTES.ADOPCIONES.OBTENER_ADOPCIONES;
  // private apiUrlObtenerPorId = API_COLITAS_ROUTES.ADOPCIONES.OBTENER_ADOPCIONESID;

  private apiUrl: string = 'http://localhost:3000/api/adopciones/'; 


  constructor(private http: HttpClient) { }

  // obtenerAdopciones(): Observable<ResponseColitas> {
  //   return this.http.get<ResponseColitas>(this.apiUrl);
  // }

  // obtenerAdopcionPorId(id: number): Observable<ResponseColitas> {
  //   const url = `${this.apiUrlObtenerPorId}/${id}`;
  //   return this.http.get<ResponseColitas>(url);
 

  obtenerAdopcionPorId(id: number): Observable<ResponseColitas> {
    return this.http.get<ResponseColitas>(`${this.apiUrl}/buscarAdopcionID/${id}`);
  }

}
