import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionesComponent } from './donaciones.component';
import { DonacionesRoutingModule } from './donaciones-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

import { FieldsetModule } from 'primeng/fieldset';


@NgModule({
  declarations: [
    DonacionesComponent,
  ],
  imports: [
    CommonModule,
    DonacionesRoutingModule,
    SharedModule,
    CardModule,
    FieldsetModule,
    
  ]
})
export class DonacionesModule { }
