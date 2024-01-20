import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CambiarContraseniaComponent }
    ])],
    exports: [RouterModule]
})
export class CambiarContraseniaRoutingModule { }
