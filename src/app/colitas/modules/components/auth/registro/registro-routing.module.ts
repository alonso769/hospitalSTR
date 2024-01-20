import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './registro.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegistroComponent }
    ])],
    exports: [RouterModule]
})
export class RegistroRoutingModule { }
