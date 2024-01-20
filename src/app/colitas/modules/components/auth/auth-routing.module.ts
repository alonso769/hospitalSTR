import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },
        { path: 'recuperar', loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarModule) },
        { path: 'cambiarcontrasena', loadChildren: () => import('./cambiar-contrasenia/cambiar-contrasenia.module').then(m => m.CambiarContraseniaModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
