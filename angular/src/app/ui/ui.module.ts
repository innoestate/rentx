import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UiActionsComponent } from './components/ui-actions/ui-actions.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { UiIconService } from './components/ui-icon/service/ui-icon.service';
import { UiIconComponent } from './components/ui-icon/ui-icon.component';
import { UiNavigationComponent } from './components/ui-navigation/ui-navigation.component';
import { UiNavigatorComponent } from './components/ui-navigator/ui-navigator.component';
import { UiSpinnerComponent } from './components/ui-spinner/ui-spinner.component';
import { UiTableComponent } from './components/ui-table/ui-table.component';
import { UiMessageService } from './services/message/message.service';
import { UiPopupService } from './services/popup/popup.service';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    UiButtonComponent,
    UiTableComponent,
    FormsModule,
    UiSpinnerComponent,
    UiNavigatorComponent,
    UiNavigationComponent,
    UiActionsComponent,
    UiIconComponent,
  ],
  exports: [
    NzModalModule,
    UiButtonComponent,
    UiTableComponent,
    UiSpinnerComponent,
    UiNavigatorComponent,
    UiNavigationComponent,
    UiActionsComponent,
    UiIconComponent
  ],
  providers: [
    UiPopupService,
    UiMessageService,
    NzModalService,
    NzMessageService
  ]
})
export class UiModule {
  constructor() {}

  static forRoot(): ModuleWithProviders<UiModule> {
    return {
      ngModule: UiModule,
      providers: [
        UiPopupService,
        NzModalService,
        UiIconService
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
