import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdoptarComponent } from './adoptar.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: AdoptarComponent
        }
    ])],
    exports: [RouterModule]
})
export class AdoptarRoutingModule { }
