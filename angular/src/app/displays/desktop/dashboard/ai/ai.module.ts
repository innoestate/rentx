import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiComponent } from './ai.component';
import { AiRoutingModule } from './ai.routing';

@NgModule({
  declarations: [
    AiComponent
  ],
  imports: [
    CommonModule,
    AiRoutingModule
  ]
})
export class AiModule { }
