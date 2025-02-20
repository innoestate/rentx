import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PopupService } from './popup/services/popup.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzModalModule
  ],
  exports: [
    NzModalModule
  ],
  providers: [
    PopupService
  ]
})
export class UxModule { }
