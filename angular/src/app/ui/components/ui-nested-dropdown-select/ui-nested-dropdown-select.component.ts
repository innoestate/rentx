import { CommonModule } from '@angular/common';
import { Component, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiNestedDropdown2 } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';
import { UiLabelComponent } from '../ui-label/ui-label.component';
import { UiNestedDropdownComponent } from '../ui-nested-dropdown/ui-nested-dropdown.component';

@Component({
  selector: 'ui-nested-dropdown-select',
  imports: [NzDropDownModule, CommonModule, UiLabelComponent],
  templateUrl: './ui-nested-dropdown-select.component.html',
  styleUrl: './ui-nested-dropdown-select.component.scss'
})
export class UiNestedDropdownSelectComponent extends UiNestedDropdownComponent {

  loading = input<boolean>(false);
  onSelect = output<UiNestedDropdown2>();

  select(item: UiNestedDropdown2){
    this.hide();
    this.onSelect.emit(item);
  }

}
