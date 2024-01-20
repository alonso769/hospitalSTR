import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NosotrosComponent } from './nosotros.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NosotrosComponent }
    ])],
    exports: [RouterModule]
})
export class NosotrosRoutingModule { }
