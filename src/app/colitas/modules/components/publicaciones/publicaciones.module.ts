import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionesComponent } from './publicaciones.component';
import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';




@NgModule({
  declarations: [
    PublicacionesComponent,
  ],
  imports: [
    CommonModule,
    PublicacionesRoutingModule,
    SharedModule,
    TreeTableModule,
    DropdownModule,
    FieldsetModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
  ]
})
export class PublicacionesModule { }
