import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiDropdownItem } from '../ui-dropdown/model/ui-dropdown-item.model';
import { UiLabel2 } from '../ui-table-2/components/ui-label/models/ui-label.model';
import { UiLabel2Component } from '../ui-table-2/components/ui-label/ui-label.component';
import { UiNestedDropdownActions } from './model/ui-nested-dropdown-actions.model';

@Component({
  selector: 'ui-nested-dropdown-actions',
  imports: [NzDropDownModule, CommonModule, UiLabel2Component],
  templateUrl: './ui-nested-dropdown-actions.component.html',
  styleUrl: './ui-nested-dropdown-actions.component.scss'
})
export class UiNestedDropdownActionsComponent {

  dropdown = input<UiNestedDropdownActions>();

}
