import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PopupService } from './popup/services/popup.service';
import { UxButtonComponent } from './components/ux-button/ux-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    UxButtonComponent
  ],
  exports: [
    NzModalModule,
    UxButtonComponent
  ],
  providers: [
    PopupService,
  ]
})
export class UxModule { }
