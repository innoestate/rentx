import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PopupService } from './popup/services/popup.service';
import { UxButtonComponent } from './popup/components/ux-button/ux-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    UxButtonComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule
  ],
  exports: [
    NzModalModule,
    UxButtonComponent
  ],
  providers: [
    PopupService
  ]
})
export class UxModule { }
