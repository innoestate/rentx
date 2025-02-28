import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UxPopupService } from './popup/services/popup.service';
import { UxButtonComponent } from './components/ux-button/ux-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    UxButtonComponent,
    FormsModule
  ],
  exports: [
    NzModalModule,
    UxButtonComponent
  ],
  providers: [
    UxPopupService,
  ]
})
export class UxModule { }
