import { CommonModule } from '@angular/common';
import { Component, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiNestedDropdown2 } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';
import { UiLabel2Component } from '../ui-table/components/ui-label/ui-label.component';
import { UiNestedDropdown2Component } from '../ui-nested-dropdown2/ui-nested-dropdown2.component';

@Component({
  selector: 'ui-nested-dropdown-select',
  imports: [NzDropDownModule, CommonModule, UiLabel2Component],
  templateUrl: './ui-nested-dropdown-select.component.html',
  styleUrl: './ui-nested-dropdown-select.component.scss'
})
export class UiNestedDropdownSelectComponent extends UiNestedDropdown2Component {

  loading = input<boolean>(false);
  onSelect = output<UiNestedDropdown2>();

  select(item: UiNestedDropdown2){
    this.hide();
    this.onSelect.emit(item);
  }

}
