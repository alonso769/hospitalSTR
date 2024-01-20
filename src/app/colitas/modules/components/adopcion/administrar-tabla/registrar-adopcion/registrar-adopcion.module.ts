import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { RegistrarAdopcionComponent } from './registrar-adopcion.component';
import { RegistrarAdopcionRoutingModule } from './registrar-adopcion-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RegistrarAdopcionRoutingModule
  ]
})
export class RegistrarAdopcionModule { }
