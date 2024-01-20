import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModificarAdopcionComponent } from './modificar-adopcion.component';


@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: ModificarAdopcionComponent},
        { path: ':id', component: ModificarAdopcionComponent },
    ])],
    exports: [RouterModule]
})
export class ModificarAdopcionRoutingModule { }