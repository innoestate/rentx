import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UiActionsComponent } from './components/ui-actions/ui-actions.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { UiIconService } from './components/ui-icon/service/ui-icon.service';
import { UiNavigationComponent } from './components/ui-navigation/ui-navigation.component';
import { UiSpinnerComponent } from './components/ui-spinner/ui-spinner.component';
import { UiMessageService } from './services/message/message.service';
import { UiPopupService } from './services/popup/popup.service';
import { UiDynamicComponentComponent } from './components/ui-dynamic-component/ui-dynamic-component.component';
import { UiEditableTextComponent } from './components/ui-editable-text/ui-editable-text.component';
import { UiTableComponent } from './components/ui-table/ui-table.component';
import { UiIconComponent } from './components/ui-icon/ui-icon.component';
import { UiNestedDropdownActionsComponent } from './components/ui-nested-dropdown-actions/ui-nested-dropdown-actions.component';
import { UiInputComponent } from './components/ui-input/ui-input.component';
import { UiNestedDropdownSelectComponent } from './components/ui-nested-dropdown-select/ui-nested-dropdown-select.component';
import { UiNestedDropdownComponent } from './components/ui-nested-dropdown/ui-nested-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    UiButtonComponent,
    FormsModule,
    UiSpinnerComponent,
    UiNavigationComponent,
    UiActionsComponent,
    UiDynamicComponentComponent,
    UiEditableTextComponent,
    UiTableComponent,
    UiIconComponent,
    UiNestedDropdownActionsComponent,
    UiInputComponent,
    UiNestedDropdownSelectComponent,
    UiNestedDropdownComponent
  ],
  exports: [
    NzModalModule,
    UiButtonComponent,
    UiSpinnerComponent,
    UiNavigationComponent,
    UiActionsComponent,
    UiDynamicComponentComponent,
    UiEditableTextComponent,
    UiTableComponent,
    UiIconComponent,
    UiNestedDropdownActionsComponent,
    UiInputComponent,
    UiNestedDropdownSelectComponent,
    UiNestedDropdownComponent
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
