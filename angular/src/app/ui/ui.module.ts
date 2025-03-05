import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UiPopupService } from './popup/services/popup.service';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { UiTableComponent } from './components/ui-table/ui-table.component';

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
    NzModalService
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
