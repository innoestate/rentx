import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesktopRoutingModule } from './desktop.routing';
import { UiModule } from 'src/app/ui/ui.module';
import { AiModule } from 'src/app/features/ai/ai.module';

@NgModule({
  imports: [
    CommonModule,
    DesktopRoutingModule,
    UiModule.forRoot(),
    AiModule
  ]
})
export class DesktopModule { }
