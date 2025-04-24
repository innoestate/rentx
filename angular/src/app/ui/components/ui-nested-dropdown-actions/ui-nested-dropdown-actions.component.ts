import { CommonModule } from '@angular/common';
import { Component, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiLabelComponent } from '../ui-label/ui-label.component';
import { UiNestedDropdown2 } from './model/ui-nested-dropdown-actions.model';
import { UiNestedDropdownComponent } from '../ui-nested-dropdown/ui-nested-dropdown.component';

@Component({
  selector: 'ui-nested-dropdown-actions',
  imports: [NzDropDownModule, CommonModule, UiLabelComponent],
  templateUrl: './ui-nested-dropdown-actions.component.html',
  styleUrl: './ui-nested-dropdown-actions.component.scss'
})
export class UiNestedDropdownActionsComponent extends UiNestedDropdownComponent{

}
