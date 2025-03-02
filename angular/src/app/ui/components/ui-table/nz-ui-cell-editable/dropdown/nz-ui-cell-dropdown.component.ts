import { Component, effect, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isEqual } from 'lodash';
import { UiDropdownItem } from '../../../ui-dropdown/model/ui-dropdown-item.model';
import { UiDropdownComponent } from '../../../ui-dropdown/ui-dropdown.component';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.directive';

/**
 * Component that represents a cell of type dropdown in a table.
 * For optimization, the dropDown is triggered only if the placeHolderTarget is clicked
 */
@Component({
  selector: 'nz-ui-cell-dropdown',
  imports: [UiDropdownComponent, FormsModule],
  standalone: true,
  templateUrl: './nz-ui-cell-dropdown.component.html',
  styleUrl: './nz-ui-cell-dropdown.component.scss'
})
export class NzUiCellDropdownComponent extends NzUxCellEditableComponent {

  list = input.required<UiDropdownItem<any>[]>();
  protected dropDownTarget!: any;
  protected override insideValue = signal<any>(undefined!);

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
    this.insideValue.set(this.value());
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
    this.dropDownTarget = this.list().find(item => isEqual((this.insideValue()??this.value() as UiDropdownItem<any>).value, item.value))?.value;
  }

  private setVisibleTargetAsUptadeValueFromDropdown() {
    this.insideValue.set(this.list().find(item => isEqual(this.dropDownTarget, item.value)));
  }

}
