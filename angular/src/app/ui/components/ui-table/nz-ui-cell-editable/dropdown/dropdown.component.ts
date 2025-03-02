import { Component, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isEqual } from 'lodash';
import { UiDropdownItem } from '../../../ui-dropdown/model/ui-dropdown-item.model';
import { UiDropdownComponent } from '../../../ui-dropdown/ui-dropdown.component';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.component';

/**
 * Component that represents a cell of type dropdown in a table.
 * For optimization, the dropDown is triggered only if the placeHolderTarget is clicked
 */
@Component({
  selector: 'nz-ui-cell-dropdown',
  imports: [UiDropdownComponent, FormsModule],
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class NzUxCellDropdownComponent extends NzUxCellEditableComponent {

  list = input.required<UiDropdownItem<any>[]>();
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
    this.dropDownTarget = this.list().find(item => isEqual((this.insideValue??this.value() as UiDropdownItem<any>).value, item.value))?.value;
  }

  private setVisibleTargetAsUptadeValueFromDropdown() {
    this.insideValue = this.list().find(item => isEqual(this.dropDownTarget, item.value));
  }

}
