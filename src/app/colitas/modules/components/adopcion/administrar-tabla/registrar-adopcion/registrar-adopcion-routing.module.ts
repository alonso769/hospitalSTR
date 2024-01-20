import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrarAdopcionComponent } from './registrar-adopcion.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: RegistrarAdopcionComponent
        }
    ])],
    exports: [RouterModule]
})
export class RegistrarAdopcionRoutingModule { }