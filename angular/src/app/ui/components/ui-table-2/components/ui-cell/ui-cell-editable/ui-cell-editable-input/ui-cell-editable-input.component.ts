import { Component } from '@angular/core';
import { UiCellEditableComponent } from '../ui-cell-editable.component';
import { cloneDeep, isEqual } from 'lodash';
import { NzUiCell } from '../../../../models/nz-ui-cell.model';

@Component({
  selector: 'app-ui-cell-editable-input',
  imports: [],
  template: '',
})
export class UiCellEditableInputComponent extends UiCellEditableComponent {

  protected onclick() {
    if (this.editing()) {
      return;
    }
    this.editing.set(!this.editing());
    if (this.editing()) {
      setTimeout(() => {
        this.getInput()?.focus();
      }, 0);
    }
  }

  protected override endEdit() {
    const editedCell = this.createEditedCell();
    this.editIfDifferent(editedCell);
    this.editing.set(false);
  }

  private getInput() {
    return this.el.nativeElement.querySelector('input');
  }

  private editIfDifferent(editedCell: NzUiCell) {
    if (!isEqual(editedCell, this.cell())) {
      this.cell.set({ ...editedCell, internal: true });
      this.onEdit.emit(editedCell);
      this.loading.set(editedCell);
    }
  }

  private createEditedCell() {
    return cloneDeep({
      ...this.cell()!,
      label: {
        ...this.cell()?.label,
        title: {
          ...this.cell()?.label?.title,
          label: this.getInput()?.value
        }
      }
    });
  }

}
