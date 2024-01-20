import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { AdministrarAdoptadosComponent } from './administrar-adoptados.component';
import { AdministrarAdoptadosRoutingModule } from './administrar-adoptados-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TimesIcon } from 'primeng/icons/times';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdministrarAdoptadosComponent
  ],
  imports: [
    CommonModule,
    AdministrarAdoptadosRoutingModule,
    SharedModule,
    PaginatorModule,
    DialogModule,
    TimesIcon,
    ReactiveFormsModule
  ]
})
export class AdministrarAdoptadosModule { }
