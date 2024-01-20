import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//IMPORT OF PRIME NG
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';


//IMPORT COMPONENTS
import { FooterComponent } from './components/header/footer/footer.component';
import { NavBarComponent } from './components/header/nav-bar/nav-bar.component';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  declarations: [
   NavBarComponent,FooterComponent,
  ],
  imports: [
    CommonModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    OverlayPanelModule

  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    InputTextModule,
    CheckboxModule,
    MenubarModule,
    CardModule,

  ]
})
export class SharedModule { }
