import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicacionesComponent } from './publicaciones.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PublicacionesComponent }
    ])],
    exports: [RouterModule]
})
export class PublicacionesRoutingModule { }
