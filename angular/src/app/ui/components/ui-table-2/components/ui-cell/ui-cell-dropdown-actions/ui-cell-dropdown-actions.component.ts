import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { UiNestedDropdownActionsComponent } from 'src/app/ui/components/ui-nested-dropdown-actions/ui-nested-dropdown-actions.component';
import { UiCellComponent } from '../ui-cell.component';

@Component({
  imports: [CommonModule, UiNestedDropdownActionsComponent],
  templateUrl: './ui-cell-dropdown-actions.component.html',
  styleUrl: './ui-cell-dropdown-actions.component.scss'
})
export class UiCellDropdownActionsComponent extends UiCellComponent {

  dropdown = computed(() => {
    return this.cell()?.dropdown;
  });

}
