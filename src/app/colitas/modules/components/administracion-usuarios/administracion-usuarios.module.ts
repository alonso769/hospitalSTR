import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionUsuariosComponent } from './administracion-usuarios.component';
import { AdministrarUsuariosRoutingModule } from './administracion-usuarios-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministracionUsuariosComponent
  ],
  imports: [
    CommonModule,
    AdministrarUsuariosRoutingModule,
    SharedModule,
    FormsModule
    
  ]
})
export class AdministracionUsuariosModule { }
