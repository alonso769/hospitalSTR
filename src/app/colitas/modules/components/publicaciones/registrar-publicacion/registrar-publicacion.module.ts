import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPublicacionComponent } from './registrar-publicacion.component';
import { SharedModule } from '../../../shared/shared.module';
import { RegistrarAdopcionRoutingModule } from './registrar-publicacion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistrarPublicacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrarAdopcionRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistrarPublicacionModule { }
