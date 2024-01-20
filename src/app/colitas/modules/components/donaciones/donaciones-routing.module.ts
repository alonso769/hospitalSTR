import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonacionesComponent } from './donaciones.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: DonacionesComponent}
    ])],
    exports: [RouterModule]
})
export class DonacionesRoutingModule { }
