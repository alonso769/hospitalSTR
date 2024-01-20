import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';

@Injectable({
  providedIn: 'root'
})
export class AdopcionesService {

  //Tabla ADOPCIONES
  private apiUrl = API_COLITAS_ROUTES.ADOPCIONES.OBTENER_ADOPCIONES;
  private apiUrlObtenerPorId = API_COLITAS_ROUTES.ADOPCIONES.OBTENER_ADOPCIONESID;
  private apiUrlRegistrar = API_COLITAS_ROUTES.ADOPCIONES.INSERTAR_ADOPCION;
  private apiUrlModificar = API_COLITAS_ROUTES.ADOPCIONES.MODIFICAR_ADOPCION;
  private apiUrlModificarPorID = API_COLITAS_ROUTES.ADOPCIONES.MODIFICAR_ADOPCIONID;
  private apiUrlEliminar = API_COLITAS_ROUTES.ADOPCIONES.ELIMINAR_ADOPCION;


  //Tabla LOG
  private apiUrlObtenerMascotasAdoptadas = API_COLITAS_ROUTES.ADOPCIONES.OBTENER_MASCOTAS_ADOPTADAS;
  private apiUrlEliminarlog = API_COLITAS_ROUTES.ADOPCIONES.ELIMINAR_ADOPCION_LOG;
  private apiUrlDeshacerlog = API_COLITAS_ROUTES.ADOPCIONES.DESHACER_MASCOTA_LOG;
  private apiUrlEliminarDefinitivo = API_COLITAS_ROUTES.ADOPCIONES.ELIMINAR_DEFINITIVO_LOG;


  private apiUrlCargarImagen = API_COLITAS_ROUTES.IMAGENES.CARGAR_IMAGENES;

  // private apiUrlFrontend = '../assets/colitas/publicaciones';
  public apiUrlback = '../images';



  constructor(private http: HttpClient) { }

  obtenerAdopciones(): Observable<ResponseColitas> {
    return this.http.get<ResponseColitas>(this.apiUrl);
  }

  obtenerAdopcionPorId(id: number): Observable<ResponseColitas> {
    const url = `${this.apiUrlObtenerPorId}/${id}`;
    return this.http.get<ResponseColitas>(url);
  }

  registrarPublicacion(adopciones: { nombre: string, edad: string, raza: string, descripcion: string, linkImg: string, encargado: string, dni: string, telefono: string }): Observable<ResponseColitas> {
    const url = `${this.apiUrlRegistrar}`;
    return this.http.post<ResponseColitas>(url, adopciones);
  }

  modificarPublicacion(adopciones: { nombre: string, edad: string, raza: string, descripcion: string, linkImg: string }): Observable<ResponseColitas> {
    const url = `${this.apiUrlModificar}`;
    return this.http.post<ResponseColitas>(url, adopciones);
  }


  modificarPublicacionPorID(id: string, adopcion: { nombre: string, edad: string, raza: string, descripcion: string, linkImg: string }): Observable<ResponseColitas> {
    const url = `${this.apiUrlModificarPorID}/${id}`;
    return this.http.put<ResponseColitas>(url, adopcion);
  }

//Eliminar de adminstrar-tabla-adopciones
  eliminarPublicacion(id:number): Observable<ResponseColitas> {
    const url = `${this.apiUrlEliminar}/${id}`;
    return this.http.delete<ResponseColitas>(url);
  }


  cargarImagen(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrlCargarImagen, formData);
  }



  //--------------------------------------------------------LOG--------------------------------------------------------------------
  
//Obtener resultados Log
  obtenerMascotasAdoptadas(): Observable<ResponseColitas> {
    return this.http.get<ResponseColitas>(this.apiUrlObtenerMascotasAdoptadas);
  }

  //Eliminar la publicacion en Log
  eliminarPublicacionLog(id:number): Observable<ResponseColitas> {
    const url = `${this.apiUrlEliminarlog}/${id}`;
    return this.http.delete<ResponseColitas>(url);
  }

  //Deshacer y enviar la publicacion a la tabla administrar tabla
  deshacerLog(id:number): Observable<ResponseColitas> {
    const url = `${this.apiUrlDeshacerlog}/${id}`;
    return this.http.delete<ResponseColitas>(url);
  }

  //Eliminar y no dejar rastro de la informacion
  eliminarPublicacionTotalLOG(id:number): Observable<ResponseColitas> {
    const url = `${this.apiUrlEliminarDefinitivo}/${id}`;
    return this.http.delete<ResponseColitas>(url);
  }

  
}
