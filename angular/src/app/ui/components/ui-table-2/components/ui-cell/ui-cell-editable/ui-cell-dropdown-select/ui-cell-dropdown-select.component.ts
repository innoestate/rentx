import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { UiNestedDropdownActions } from 'src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';
import { UiNestedDropdownSelectComponent } from 'src/app/ui/components/ui-nested-dropdown-select/ui-nested-dropdown-select.component';
import { UiCellEditableComponent } from '../ui-cell-editable.component';

@Component({
  selector: 'app-ui-cell-dropdown-select',
  imports: [CommonModule, UiNestedDropdownSelectComponent],
  templateUrl: './ui-cell-dropdown-select.component.html',
  styleUrl: './ui-cell-dropdown-select.component.scss'
})
export class UiCellDropdownSelectComponent extends UiCellEditableComponent {

  dropdown = computed(() => {
    return this.cell()?.dropdown;
  });

  onSelect(item: UiNestedDropdownActions){
    const editedCell = cloneDeep({
      ...this.cell()!,
      dropdown: {
        ...this.cell()?.dropdown,
        label: item.label
      }
    });
    if (!isEqual(editedCell, this.cell())) {
      this.cell.set({ ...editedCell, internal: true });
      this.onEdit.emit(editedCell);
      this.loading.set(editedCell);
    }
    this.editing.set(false);
  }


}
