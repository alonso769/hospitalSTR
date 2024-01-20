import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';
import { CambiarContraseniaRoutingModule } from './cambiar-contrasenia-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    CambiarContraseniaComponent
  ],
  imports: [
    CommonModule,
    CambiarContraseniaRoutingModule,
    
    ReactiveFormsModule,
    SharedModule, // Componentes reutilizables
    ProgressSpinnerModule
  ]
})
export class CambiarContraseniaModule { }
