import { Component, computed, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isEqual } from 'lodash';
import { UxDropdownItem } from '../../ux-dropdown/model/ux-dropdown-item.model';
import { UxDropdownComponent } from '../../ux-dropdown/ux-dropdown.component';
import { CellType } from '../types/ux-table.cell.type';

/**
 * Component that represents a cell of type dropdown in a table.
 * For optimization, the dropDown is triggered only if the placeHolderTarget is clicked
 */
@Component({
  selector: 'nz-ux-cell-dropdown',
  imports: [UxDropdownComponent, FormsModule],
  standalone: true,
  templateUrl: './nz-ux-cell-dropdown.component.html',
  styleUrl: './nz-ux-cell-dropdown.component.scss'
})
export class NzUxCellDropdownComponent {

  value = input.required<CellType>();
  list = input.required<UxDropdownItem<any>[]>();
  isOnEditMode = input.required<boolean>();
  isOnViewMode = computed(() => !this.isOnEditMode());
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<string>();

  dropDownTarget!: any;
  placeHolderTarget!: any;

  constructor() {
    effect(() => {
      this.fitPlaceHolderTargetFromInputValue();
      this.fitTargetsFromEditMode();
    })
  }

  startToEdit() {
    this.startEdit.emit();
  }

  makeEdit() {
    this.edit.emit(this.dropDownTarget);
  }

  endEdit() {
    this.stopEdit.emit();
  }

  private fitPlaceHolderTargetFromInputValue() {
    this.placeHolderTarget = this.value();
  }

  private fitTargetsFromEditMode() {
    if (this.isOnEditMode()) {
      this.setDropDownTargetWhenOpen();
    } else if (this.dropDownTarget) {
      this.setVisibleTargetAsUptadeValueFromDropdown();
      this.makeEdit();
    }
  }

  private setDropDownTargetWhenOpen(){
    this.dropDownTarget = this.list().find(item => isEqual((this.placeHolderTarget??this.value() as UxDropdownItem<any>).target, item.target))?.target;
  }

  private setVisibleTargetAsUptadeValueFromDropdown() {
    this.placeHolderTarget = this.list().find(item => isEqual(this.dropDownTarget, item.target));
  }

}
