import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedData } from 'src/app/colitas/services/SharedData.service';
import { Router } from '@angular/router';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../auth/login/services/login.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrls: ['./administracion-usuarios.component.scss'],
  providers: [MessageService]
})
export class AdministracionUsuariosComponent implements OnInit {

  visible: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;
  formRegistro: FormGroup;
  msgRegistro: string = '';
  msgError: string = '';

  buscarTexto: string ='';


  //Vincular
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  // fecha_creacion: string;

  usuario: any = {};

  idUsuarioSeleccionado: number;
  mostrarSeleccionar = false;
  nuevoRol: string;

  
  // protected usuarios: {
  //   id: number;
  //   nombre: string;
  //   apellido: string;
  //   correo: string;
  //   rol: string;
  // }[] = [];

  protected usuarios:  any[] = [];
  protected usuarioModificar:  any[] = [];

  constructor(private fb: FormBuilder, private _loginService: LoginService, private _sharedData: SharedData, public router: Router, private messageService: MessageService, private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    console.log('Usuario al inicio:', this.usuario);

    this.obtenerTodosUsuarios();

    this.formRegistro = this.fb.group({
      rol: ['', Validators.required],
    });
  }

  onGlobalFilter(buscarTexto: string) {
    if (buscarTexto.trim() === '') {
        // If the search text is empty, restore the original array
        this.obtenerTodosUsuarios();
    } else {
        // Implement your filtering logic here
        this.usuarios = this.usuarios.filter(usuario =>
            usuario.nombre.toLowerCase().includes(buscarTexto.toLowerCase())
        );
    }
  }


  seleccionarRol(event: any) {
    console.log('Rol seleccionado:', event.target.value);
    this.nuevoRol = event.target.value;
  }

  seleccionarUsuario(usuario: any) {
    console.log('Usuario seleccionado:', usuario);
    
    // Asignar el usuario a local
    this.usuario = { ...usuario };
  
    // Cargar los datos del usuario en el formulario
    this.formRegistro.patchValue({
      rol: this.usuario.rol,
    });
  }

  //Listar usuarios
  async obtenerTodosUsuarios() {
    try {
      this.usuarios = [];


      const responseColitas: ResponseColitas = await this._loginService.obtenerUsuarios().toPromise();

      this.usuarios = [];

      responseColitas.data.forEach(p => {
        // p.linkImg = `${this.urlImagenes}${p.img}`;
        p.id = p.codigo;
        // p.fechaPublicacion = p.fecha;
        // p.fechaPublicacion = `${this.formatoFechasPublicacion(p.fechaPublicacion)}`
        this.usuarios.push({ ...p });
      });

      console.log(this.usuarios);
    } catch (error) {
      // console.error("Error al obtener las adopciones", error);
    }
  }



  async obtenerUsuario(id: number): Promise<any> {
    try {
      const responseColitas: ResponseColitas = await this._loginService.obtenerUsuarioPorId(id).toPromise();
      console.log('Respuesta del servicio:', responseColitas);

      if (responseColitas.data && responseColitas.data.id) {
        const p = responseColitas.data;
        this.usuarioModificar = { ...p };
        // p.id = p.codigo;
        // Set user information properties
        // this.rol = p.rol;

        console.log('Usuario a modificar:', this.usuarioModificar);
      } else {
        console.warn(`No se encontró ninguna adopción con ID ${id}`);
      }
    } catch (error) {
      console.error("Error al obtener la adopción", error);
    }
  }

//OK OBTIENE EL ID Y LO PONE EN LA RUTA JUNTO A LA TABLA
  // async modificarInformacionUsuario(id: number): Promise<void> {
  //   console.log('ID a modificar:', id);
  //   const publicacionSeleccionada = this.usuarios.find(a => a.id === id);

  //   if (publicacionSeleccionada) {
  //     console.log(publicacionSeleccionada);
  //     this._sharedData.data = publicacionSeleccionada;

  //     // Navegar a la ruta con el parámetro "id"
  //     // this._router.navigate(['/administarUsuarios/', id]);
  //     this._router.navigateByUrl(`/administrarUsuarios/${id}`);
  //   } else {
  //     console.warn(`No se encontró ninguna publicación con el ID ${id}`);
  //   }
  // }

  async modificarInformacionUsuario(id: number): Promise<void> {
    console.log('ID a modificar:', id);
    const usuarioSeleccionado = this.usuarios.find(a => a.id === id);

    if (usuarioSeleccionado) {
        console.log('Usuario seleccionado:', usuarioSeleccionado);

        // Pregunta al usuario si está seguro de modificar el rol
        const confirmacion = window.confirm('¿Estás seguro que quieres modificar el rol de este usuario?');

        if (confirmacion) {
            this._sharedData.data = usuarioSeleccionado;

            this._router.navigateByUrl(`/administrarUsuarios/${id}`);

            // Obtener el usuario por ID
            this._loginService.obtenerUsuarioPorId(id).subscribe(response => {
                const usuario = response.data;
                console.log('Usuario a modificar:', usuario);

                // Construir el objeto para actualizar
                const body = { rol: this.nuevoRol };

                // modificar el rol
                this._loginService.modificarRolUsuario(usuario.id.toString(), body)
                    .subscribe(responseModificacion => {
                        console.log('Rol de usuario modificado:', responseModificacion);

                        // Actualiza localmente el rol del usuario
                        usuarioSeleccionado.rol = this.nuevoRol;

                        // Limpia la variable nuevoRol después de la modificación
                        this.nuevoRol = '';

                        // Navega a la página de administración de usuarios
                        this.router.navigate([`/administrarUsuarios`]);
                    });
            }, error => {
                console.error("Error al obtener la información del usuario", error);
            });
        }
    } else {
        console.warn(`No se encontró ninguna publicación con el ID ${id}`);
    }
}


  //Eliminar Usuario
  async eliminar(usuario: any) {
    console.log('Publicaciones disponibles antes de eliminar:', this.usuarios);
    const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este Usuario?');

    if (confirmarEliminar) {
      try {
        console.log('ID de la publicación para eliminar:', usuario.id);
        await this._loginService.eliminarUsuario(usuario.id).toPromise();

        const index = this.usuarios.findIndex(p => p.id === usuario.id);

        if (index !== -1) {
          this.usuarios.splice(index, 1);
          console.log('Publicación eliminada correctamente');
        } else {
          console.error('No se encontró la publicación');
        }
      } catch (error) {
        console.error('Error al eliminar la publicación', error);
        alert('Error al eliminar la publicación. Por favor, inténtalo de nuevo.');
      }
    }
  }

}
