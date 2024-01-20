import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map ,catchError, switchMap} from 'rxjs';
import { API_COLITAS_ROUTES } from 'src/app/colitas/data/constants/routes/api.routes';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated: boolean = false;
  private usuario: any = null;


  private apiUrl = API_COLITAS_ROUTES.SEGURIDAD.INICIAR_SESION;
  private apiUrlObtenerUsuarios = API_COLITAS_ROUTES.SEGURIDAD.OBTENER_USUARIOS;
  private apiUrlBuscarUsuarioIDbody = API_COLITAS_ROUTES.SEGURIDAD.BUSCAR_USUARIO_ID_BODY;
  private apiUrlBuscarUsuarioID = API_COLITAS_ROUTES.SEGURIDAD.BUSCAR_USUARIO_ID;
  private apiUrlBuscarUsuarioEmail = API_COLITAS_ROUTES.SEGURIDAD.BUSCAR_USUARIO_EMAIL;
  private apiUrlModificarUsuario = API_COLITAS_ROUTES.SEGURIDAD.MODIFICAR_USUARIOS;
  private apiUrlModificarUsuarioiD = API_COLITAS_ROUTES.SEGURIDAD.MODIFICAR_USUARIOS_ID;
  private apiUrlEliminarUsuario = API_COLITAS_ROUTES.SEGURIDAD.ELIMINAR_USUARIO;

  private apiUrlModificarUsuarioiDrol = API_COLITAS_ROUTES.SEGURIDAD.MODIFICAR_USUARIOS_ROL;


  constructor(private _http: HttpClient, private _cryptoService: CryptoService) { }

  iniciarSesion(usuario: { email: string, password: string }): Observable<ResponseColitas> {

    return this._http.post<ResponseColitas>(this.apiUrl, usuario);
  }

  // obtenerInformacionUsuario(): Observable<any> {
  //   return this._http.get<any>(this.apiUrl)
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error al obtener información del usuario:', error);
  //         throw error; // Propaga el error hacia arriba para que el componente también pueda manejarlo
  //       })
  //     );
  // }

  
  obtenerUsuarios(): Observable<ResponseColitas> {
    // console.log('URL de Obtener Usuarios:', this.apiUrlObtenerUsuarios);
    return this._http.get<ResponseColitas>(this.apiUrlObtenerUsuarios);
  }

  obtenerUsuarioPorId(id: number): Observable<ResponseColitas> {
    const url = `${this.apiUrlBuscarUsuarioID}/${id}`;
    return this._http.get<ResponseColitas>(url);
  }

  obtenerUsuarioPorIdbody(id: string): Observable<ResponseColitas> {
    const url = `${this.apiUrlBuscarUsuarioIDbody}`;
    
    const requestBody = { id: id };

    return this._http.post<ResponseColitas>(url, requestBody);
  }


  buscarUsuarioXemail(email: string): Observable<ResponseColitas> {
    const url = `${this.apiUrlBuscarUsuarioEmail}?email=${email}`;
    console.log('URL de Obtener Usuario Logeado:', url);
  
    return this._http.get<ResponseColitas>(url);
  }

  modificarUsuario(usuario: {nombres:string, apellidos:string, correo:string, rol: string}): Observable<ResponseColitas> {
    const url = `${this.apiUrlModificarUsuario}`;
    return this._http.put<ResponseColitas>(url, usuario);
  }


  //Modificar Rol del Usuario
  modificarRolUsuario(id: string, body: { rol: string }): Observable<ResponseColitas> {
    const url = `${this.apiUrlModificarUsuarioiDrol}/${id}`;
    // const body = { rol: nuevoRol };
  
    return this._http.put<ResponseColitas>(url, body);
  }


  modificarUsuarioID(id: string, usuario: { nombres:string, apellidos:string, email:string, rol: string}): Observable<ResponseColitas> {
    const url = `${this.apiUrlModificarUsuarioiD}/${id}`;
    return this._http.put<ResponseColitas>(url, usuario);
  }


  eliminarUsuario(id:number): Observable<ResponseColitas> {
    const url = `${this.apiUrlEliminarUsuario}/${id}`;
    return this._http.delete<ResponseColitas>(url);
  }




  
  obtenerRoles(): Observable<string[]> {
    return of(this.usuario ? this.usuario.rol : []);
  }

  login(usuario: any) {
    this.isAuthenticated = true;
    this.usuario = usuario;
  }

  // Set the authentication status when the user logs out
  logout() {
    this.isAuthenticated = false;
  }

  // Check if the user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


  ObtenerUsuarioSessionStorage(): any {
    return this.usuario;
  }

  getAuthToken(): string | null {
    const usuario = this.ObtenerUsuarioSessionStorage();
    return usuario && usuario.token ? usuario.token : null;
  }

  getTokenFromSessionStorage(): string | null {
    const datosEncriptados = sessionStorage.getItem('token_session');
    if (datosEncriptados) {
      const token = this._cryptoService.decrypt(datosEncriptados);
      return token;
    }
    return null;
  }
}
