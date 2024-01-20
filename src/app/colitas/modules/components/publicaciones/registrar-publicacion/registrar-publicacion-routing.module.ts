import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrarPublicacionComponent } from './registrar-publicacion.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: RegistrarPublicacionComponent
        }
    ])],
    exports: [RouterModule]
})
export class RegistrarAdopcionRoutingModule { }