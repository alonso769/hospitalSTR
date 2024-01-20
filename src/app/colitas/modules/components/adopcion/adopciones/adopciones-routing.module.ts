import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdopcionesComponent } from './adopciones.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: AdopcionesComponent
        }
    ])],
    exports: [RouterModule]
})
export class AdopcionesRoutingModule { }
