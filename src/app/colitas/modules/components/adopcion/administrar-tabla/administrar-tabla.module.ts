import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { AdministrarTablaComponent } from './administrar-tabla.component';
import { AdministrarTablaRoutingModule } from './administrar-tabla-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TimesIcon } from 'primeng/icons/times';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarAdopcionComponent } from './registrar-adopcion/registrar-adopcion.component';
import { ModificarAdopcionComponent } from './modificar-adopcion/modificar-adopcion.component';



@NgModule({
  declarations: [
    AdministrarTablaComponent,
    RegistrarAdopcionComponent,
    ModificarAdopcionComponent
  ],
  imports: [
    CommonModule,
    AdministrarTablaRoutingModule,
    SharedModule,
    PaginatorModule,
    DialogModule,
    TimesIcon,
    ReactiveFormsModule
  ]
})
export class AdministrarTablaModule { }
