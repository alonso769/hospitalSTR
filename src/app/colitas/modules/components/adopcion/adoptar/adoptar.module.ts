import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdoptarComponent } from './adoptar.component';
import { AdoptarRoutingModule } from './adoptar-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { AdopcionRoutingModule } from '../adopcion-routing.module';


import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AdoptarComponent
  ],
  imports: [
    CommonModule,
    AdoptarRoutingModule,
    SharedModule,
    GalleriaModule,
    AdopcionRoutingModule
  ]
})
export class AdoptarModule { }
