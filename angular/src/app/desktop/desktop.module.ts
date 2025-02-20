import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesktopRoutingModule } from './desktop.routing';
import { UxModule } from '../ux/ux.module';

@NgModule({
  imports: [
    CommonModule,
    DesktopRoutingModule,
  ]
})
export class DesktopModule { }
