import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstalacionesComponent } from './instalaciones.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: InstalacionesComponent }
    ])],
    exports: [RouterModule]
})
export class InstalacionesRoutingModule { }
