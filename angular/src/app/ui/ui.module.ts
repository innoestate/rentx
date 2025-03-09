import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UiPopupService } from './services/popup/popup.service';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { UiTableComponent } from './components/ui-table/ui-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UiMessageService } from './services/message/message.service';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    UiButtonComponent,
    UiTableComponent,
    FormsModule,
  ],
  exports: [
    NzModalModule,
    UiButtonComponent,
    UiTableComponent,
  ],
  providers: [
    UiPopupService,
    UiMessageService,
    NzModalService,
    NzMessageService,
  ]
})
export class UiModule {
  constructor() {
    console.log('UiModule constructor');
  }

  static forRoot(): ModuleWithProviders<UiModule> {
    return {
      ngModule: UiModule,
      providers: [
        UiPopupService,
        NzModalService
      ]
    }
  }

  static forChild(): ModuleWithProviders<UiModule> {
    return {
      ngModule: UiModule,
      providers: [
        UiPopupService,
        NzModalService
      ]
    }
  }
}
