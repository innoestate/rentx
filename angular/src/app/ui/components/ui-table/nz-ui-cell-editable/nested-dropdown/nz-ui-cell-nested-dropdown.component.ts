import { Component, computed, input, signal } from '@angular/core';
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
  nzTableList = computed(() => this.addRowArgumentInCommands(this.list()));

  editNestedDropdown(value: UiDropdownItem<any>) {
    this.edit.emit(value);
    this.insideValue.set(this.list().find(item => isEqual(value, item)));
    this.isOnEditMode.set(false);
  }

  private addRowArgumentInCommands(items: UiDropdownItem<any>[]): UiDropdownItem<any>[] {
    return items.map(item_ => {
      const item = item_ as any;
      if (item.value instanceof Array) {
        return { label: item.label, value: this.addRowArgumentInCommands(item.value) };
      } else if( item.command !== undefined ){
        return { ...item, command: () => {
          item.command(this.row());
          return true;
        }};
      }else{
        return {...item};
      }
    })
  }

}

