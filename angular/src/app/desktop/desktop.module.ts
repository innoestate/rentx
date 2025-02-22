import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesktopRoutingModule } from './desktop.routing';
import { UxModule } from '../ux/ux.module';
import { PopupService } from '../ux/popup/services/popup.service';
import { DevPopupService } from '../ux/popup/services/dev.popup.service';

@NgModule({
  imports: [
    CommonModule,
    DesktopRoutingModule,
  ]
})
export class DesktopModule { }
