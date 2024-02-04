import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NavBarService } from './service/nav-bar.service';
import { AuthService } from '../../../../../modules/components/auth/auth.service';
import { CryptoService } from 'src/app/colitas/services/CryptoService.service';
import { ResponseColitas } from 'src/app/colitas/models/response';
import { LoginService } from 'src/app/colitas/modules/components/auth/login/services/login.service';
import { SharedData } from 'src/app/colitas/services/SharedData.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAdmin: boolean = false;

  @ViewChild('userButton') userButton: any;
  @ViewChild('menu') menu: any;

  menuItems: MenuItem[] = [];

  // menuItems: MenuItem[] = [
    
  //   // { label: 'Administrar Usuarios', icon: 'pi pi-user', command: () => this.administrarUsuarios() },
  //   { label: 'Perfil', icon: 'pi pi-user', command: () => this.visualizarPerfil() },
  //   { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() },
  // ];
  
  
  constructor(private _sharedData:SharedData ,public layoutService: LayoutService, public router: Router, private _cerrarSesionService:NavBarService, route:ActivatedRoute, private _loginService:LoginService) { }

  public id:number;
  protected email: string = '';
  protected usuario: string = '';
  protected rol: string ='';

  menuVariable=true;
  // menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  ngOnInit() {
    this.usuario = this.ObtenerUsuarioSessionStorage()? this.ObtenerUsuarioSessionStorage().usuario : 'Iniciar Sesión';
    console.log('Usuario logeado:',this.ObtenerUsuarioSessionStorage())

    this.rol = this.ObtenerUsuarioSessionStorage()? this.ObtenerUsuarioSessionStorage().rol : '';
    console.log(this.ObtenerUsuarioSessionStorage())

    this.obtenerTodosUsuarios();


    this.verificarRolDeUsuario();    if (this.isAdmin) {
      this.menuItems = [
        { label: 'Adm. Usuarios', icon: 'pi pi-user', command: () => this.administrarUsuarios() },
        { label: 'Perfil', icon: 'pi pi-user', command: () => this.visualizarPerfil() },
        { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() },
      ];
    } else {
      this.menuItems = [
        { label: 'Perfil', icon: 'pi pi-user', command: () => this.visualizarPerfil() },
        { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() },
      ];
    }
  }

  verificarRolDeUsuario() {
    // Aquí debes tener lógica para verificar si el usuario es administrador o no.
    // Puedes obtener esta información desde tu servicio de autenticación o de algún otro lugar.
  
    // Ejemplo de lógica:
    const usuario = this.ObtenerUsuarioSessionStorage();
    this.isAdmin = usuario && usuario.rol === 'Admin';
  }
  

  administrarUsuarios() {
    this.router.navigate(['/administrarUsuarios']);
  }

  visualizarPerfil(): void {
    const usuario = this.ObtenerUsuarioSessionStorage();
  
    if (usuario && usuario.codigo) {
      const id = usuario.codigo;
      const usuarioSeleccionado = this.usuarios.find(u => u.id === id);
  
      if (usuarioSeleccionado) {
        // console.log('Este es tu Shared Data:',usuarioSeleccionado);
        this._sharedData.data = usuarioSeleccionado;
        this.router.navigateByUrl(`/MIperfil/${id}`);
      } else {
        console.warn(`No se encontró ningún usuario con el ID ${id}`);
      }
    } else {
      console.warn('Código de usuario no disponible');
    }
  }

  protected usuarios: any [] = [];


  async obtenerTodosUsuarios() {
    try {
      const responseColitas: ResponseColitas = await this._loginService.obtenerUsuarios().toPromise();
  
      // Limpiar el array antes de agregar nuevos usuarios
      this.usuarios = [];
  
      responseColitas.data.forEach(p => {
        p.id = p.codigo;
        this.usuarios.push({ ...p });
      });
  
      // console.log(this.usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  }

  // visualizarPerfil() {
  //   if (this.ObtenerUsuarioSessionStorage()) {
  //     const usuario = this.ObtenerUsuarioSessionStorage();
  //     this.router.navigate(['/MIperfil', {usuario: usuario.usuario, rol: usuario.rol, email:usuario.email }]);
  //   }
  // }

  
  toggleMenu(button: any, event: any) {
    if (this.usuario && this.usuario !== 'Iniciar Sesión') {
      this.menu.toggle(event, { target: button });
    } else {
      this.router.navigate(['/auth/login']);
    }

    event.preventDefault();

    // Ajusta el desplazamiento manualmente
    window.scrollTo(0, 0);
    
  }

  logout() {
    this._cerrarSesionService.cerrarSesion().subscribe(
      () => {
        alert('Sesión cerrada exitosamente');

        localStorage.clear();
        sessionStorage.clear();

        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.log('Error al cerrar sesión', error);
      }
    );
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  handleUserButtonClick() {
    // Verificar
    if (this.usuario) {
      this.menu.toggle();
    } else {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      this.router.navigate(['/auth/login']);
    }
  }

  
  ObtenerUsuarioSessionStorage(): any {
    return JSON.parse(sessionStorage.getItem('usuario_login'));
  }

}
