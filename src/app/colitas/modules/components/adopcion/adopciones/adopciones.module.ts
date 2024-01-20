import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { AdopcionesComponent } from './adopciones.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    AdopcionesComponent
  ],
  imports: [
    CommonModule,
    AdopcionesRoutingModule,
    SharedModule
  ]
})
export class AdopcionesModule { }
