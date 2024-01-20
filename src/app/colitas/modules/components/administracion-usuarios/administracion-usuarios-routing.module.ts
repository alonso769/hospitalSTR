import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministracionUsuariosComponent } from './administracion-usuarios.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: AdministracionUsuariosComponent
        },

        {path: ':id', component: AdministracionUsuariosComponent}
    ])],
    exports: [RouterModule]
})
export class AdministrarUsuariosRoutingModule { }