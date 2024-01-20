import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactanosComponent } from './contactanos.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: ContactanosComponent}
    ])],
    exports: [RouterModule]
})
export class ContactanosRoutingModule { }
