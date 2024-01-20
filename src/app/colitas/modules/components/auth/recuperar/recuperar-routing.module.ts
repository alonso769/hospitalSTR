import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecuperarComponent } from './recuperar.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RecuperarComponent }
    ])],
    exports: [RouterModule]
})
export class RecuperarRoutingModule { }
