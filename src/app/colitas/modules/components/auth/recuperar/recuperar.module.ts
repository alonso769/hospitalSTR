import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RecuperarComponent } from './recuperar.component';
import { RecuperarRoutingModule } from './recuperar-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    RecuperarComponent
  ],
  imports: [
    CommonModule,
    RecuperarRoutingModule,
    
    ReactiveFormsModule,
    SharedModule, // Componentes reutilizables
    ProgressSpinnerModule
  ]
})
export class RecuperarModule { }
