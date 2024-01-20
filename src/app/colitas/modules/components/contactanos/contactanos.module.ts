import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactanosComponent } from './contactanos.component';
import { ContactanosRoutingModule } from './contactanos-routing.module';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    ContactanosComponent
  ],
  imports: [
    CommonModule,
    ContactanosRoutingModule,
    SharedModule
  ]
})
export class ContactanosModule { }
