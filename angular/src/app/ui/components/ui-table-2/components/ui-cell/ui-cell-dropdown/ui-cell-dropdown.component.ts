import { Component, computed } from '@angular/core';
import { UiCellComponent } from '../ui-cell.component';
import { UiLabel2Component } from '../../ui-label/ui-label.component';
import { CommonModule } from '@angular/common';
import { UiNestedDropdownActionsComponent } from 'src/app/ui/components/ui-nested-dropdown-actions/ui-nested-dropdown-actions.component';

@Component({
  selector: 'app-ui-cell-dropdown',
  imports: [CommonModule, UiLabel2Component, UiNestedDropdownActionsComponent],
  templateUrl: './ui-cell-dropdown.component.html',
  styleUrl: './ui-cell-dropdown.component.scss'
})
export class UiCellDropdownComponent extends UiCellComponent {

  dropdown = computed(() => {
    return this.cell()?.dropdown;
  });

}
