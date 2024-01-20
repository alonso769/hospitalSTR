import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrarAdoptadosComponent } from './administrar-adoptados.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: AdministrarAdoptadosComponent
        }
    ])],
    exports: [RouterModule]
})
export class AdministrarAdoptadosRoutingModule { }