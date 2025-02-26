import { Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isEqual } from 'lodash';
import { UxDropdownItem } from '../../ux-dropdown/model/ux-dropdown-item.model';
import { UxDropdownComponent } from '../../ux-dropdown/ux-dropdown.component';
import { NzUxCellEditableComponent } from '../nz-ux-cell-editable/nz-ux-cell-editable.component';

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
export class NzUxCellDropdownComponent extends NzUxCellEditableComponent {

  list = input.required<UxDropdownItem<any>[]>();
  protected dropDownTarget!: any;
  protected override insideValue!: any;

  protected override fitInsideValue() {
    effect(() => {
      this.fitPlaceHolderTargetFromInputValue();
      this.fitTargetsFromEditMode();
    })
  }

  override startToEdit() {
    this.startEdit.emit();
  }

  override makeEdit() {
    this.edit.emit(this.dropDownTarget);
  }

  override endEdit() {
    this.stopEdit.emit();
  }

  private fitPlaceHolderTargetFromInputValue() {
    this.insideValue = this.value();
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
    this.dropDownTarget = this.list().find(item => isEqual((this.insideValue??this.value() as UxDropdownItem<any>).target, item.target))?.target;
  }

  private setVisibleTargetAsUptadeValueFromDropdown() {
    this.insideValue = this.list().find(item => isEqual(this.dropDownTarget, item.target));
  }

}
