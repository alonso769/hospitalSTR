import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {


  private apiUrl = API_COLITAS_ROUTES.DOCUMENTOS.OBTENER_DOCUMENTOS;
  private apiUrlRegistrar = API_COLITAS_ROUTES.DOCUMENTOS.INSERTAR_DOCUMENTOS;
  private apiUrlEliminarPorID = API_COLITAS_ROUTES.DOCUMENTOS.ELIMINAR_DOCUMENTOS;
  private apiUrlCargarImagen = API_COLITAS_ROUTES.IMAGENES.CARGAR_IMAGENES;



  constructor(private http: HttpClient) { }

  obtenerPublicaciones(): Observable<ResponseColitas> {
    return this.http.get<ResponseColitas>(this.apiUrl);
  }

  registrarPublicacion(publicaciones: { titulo: string, linkDoc: string }): Observable<ResponseColitas> {
    const url = `${this.apiUrlRegistrar}`;
    return this.http.post<ResponseColitas>(url, publicaciones);
  }


  // Usar este con Token
  // registrarPublicacion(publicaciones:{ titulo: string, linkDoc: string }, authToken: string): Observable<ResponseColitas> {
  //   const url = `${this.apiUrlRegistrar}`;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${authToken}`
  //   });

  //   // return this.http.post<ResponseColitas>(`${this.apiUrlRegistrar}/registrarPublicacion`, publicaciones, { headers });
  //   return this.http.post<ResponseColitas>(url, publicaciones, { headers});
  // }


  eliminarPublicacion(id: number): Observable<ResponseColitas> {
    const url = `${this.apiUrlEliminarPorID}/${id}`;
    return this.http.delete<ResponseColitas>(url);
  }

  cargarImagen(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrlCargarImagen, formData);
  }

  // cargarImagen(file: File, authToken: string): Observable<ResponseColitas> {
  //   const formData = new FormData();
  //   formData.append('imagen', file, file.name);
  
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${authToken}`
  //     // Agrega otros encabezados según sea necesario
  //   });
  
  //   return this.http.post<ResponseColitas>(this.apiUrlCargarImagen, formData, { headers });
  // }

  //Con Token
  // cargarImagen(formData: FormData, authToken: string): Observable<ResponseColitas> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${authToken}`
  //     // Agrega otros encabezados según sea necesario
  //   });
  //   return this.http.post<ResponseColitas>(this.apiUrlCargarImagen, formData, { headers });
  // }
}
