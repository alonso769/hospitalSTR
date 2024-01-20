import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdoptarComponent } from './adoptar/adoptar.component';
import { CommonModule } from '@angular/common';



@NgModule({
    // declarations: [AdoptarComponent],

    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./adopciones/adopciones.module').then(m => m.AdopcionesModule) },
        { path: 'adoptar', loadChildren: () => import('./adoptar/adoptar.module').then(m => m.AdoptarModule) },        

        // { path: 'adopciones/adoptar', component: AdoptarComponent },   // Ruta sin parámetro de ID
        // { path: 'adopciones/adoptar/:id', component: AdoptarComponent }, // Agrega esta línea con el componente AdoptarComponent
        { path: ':id', component: AdoptarComponent },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AdopcionRoutingModule { }
