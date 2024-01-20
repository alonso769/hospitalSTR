import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ModificarAdopcionComponent } from './modificar-adopcion.component';
import { ModificarAdopcionRoutingModule } from './modificar-adopcion-routing.module';
import { SharedData } from 'src/app/colitas/services/SharedData.service';



@NgModule({
  providers: [SharedData],

  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ModificarAdopcionRoutingModule,
  ]
})
export class ModificarAdopcionModule { }
