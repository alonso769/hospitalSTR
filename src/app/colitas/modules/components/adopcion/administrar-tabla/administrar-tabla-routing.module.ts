import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrarTablaComponent } from './administrar-tabla.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: AdministrarTablaComponent
        }
    ])],
    exports: [RouterModule]
})
export class AdministrarTablaRoutingModule { }