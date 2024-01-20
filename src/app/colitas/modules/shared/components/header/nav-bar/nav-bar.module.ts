import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { SharedModule } from '../../../shared.module';

import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
    declarations: [

    ],

    imports: [
        CommonModule,
        SharedModule,
        SpeedDialModule
    ]

})
export class NavBarModule { }
