import { Component, input, signal } from '@angular/core';
import { UiDropdownItem } from '../../../ui-dropdown/model/ui-dropdown-item.model';
import { UiNestedDropdownComponent } from '../../../ui-nested-dropdown/ui-nested-dropdown.component';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.directive';
import { isEqual } from 'lodash';

@Component({
  selector: 'nz-ui-cell-nested-dropdown',
  imports: [UiNestedDropdownComponent],
  standalone: true,
  templateUrl: './nz-ui-cell-nested-dropdown.component.html',
  styleUrl: './nz-ui-cell-nested-dropdown.component.scss'
})
export class NzUiCellNestedDropdownComponent extends NzUxCellEditableComponent {

  protected override insideValue = signal<any>(undefined!);
  list = input.required<UiDropdownItem<string>[]>();

  editNestedDropdown(value: UiDropdownItem<any>) {
    this.edit.emit(value);
    this.insideValue.set(this.list().find(item => isEqual(value, item)));
    this.isOnEditMode.set(false);
  }

}

