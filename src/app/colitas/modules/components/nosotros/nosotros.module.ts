import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NosotrosComponent } from './nosotros.component';
import { NosotrosRoutingModule } from './nosotros-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule, AccordionTab } from 'primeng/accordion';


@NgModule({
  declarations: [
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    NosotrosRoutingModule,

    SharedModule,
    FieldsetModule,
    AccordionModule,

  ]
})
export class NosotrosModule { }
