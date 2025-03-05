import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesktopRoutingModule } from './desktop.routing';
import { UiModule } from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    DesktopRoutingModule,
    UiModule.forRoot()
  ]
})
export class DesktopModule { }
