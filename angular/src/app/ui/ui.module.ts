import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UiPopupService } from './popup/services/popup.service';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    UiButtonComponent,
    FormsModule
  ],
  exports: [
    NzModalModule,
    UiButtonComponent
  ],
  providers: [
    UiPopupService,
  ]
})
export class UiModule { }
