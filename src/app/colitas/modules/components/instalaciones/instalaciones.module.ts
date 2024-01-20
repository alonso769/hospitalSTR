import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstalacionesComponent } from './instalaciones.component';
import { InstalacionesRoutingModule } from './instalaciones-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [
    InstalacionesComponent
  ],
  imports: [
    CommonModule,
    InstalacionesRoutingModule,
    SharedModule,
    GalleriaModule,
    CarouselModule
  ]
})
export class InstalacionesModule { }
