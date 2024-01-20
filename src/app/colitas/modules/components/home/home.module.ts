import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        CarouselModule,
        SharedModule // Componentes reutilizables
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
