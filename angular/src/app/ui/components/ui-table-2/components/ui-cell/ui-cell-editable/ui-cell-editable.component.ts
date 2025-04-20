import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, signal } from '@angular/core';
import { isEqual } from 'lodash';
import { NzUiCell } from '../../../models/nz-ui-cell.model';
import { UiCellComponent } from '../ui-cell.component';

@Component({
  imports: [CommonModule],
  template: '',
  styleUrl: './ui-cell-editable.component.scss'
})
export class UiCellEditableComponent extends UiCellComponent {

  protected editing = signal(false);
  protected loading = signal<NzUiCell | null>(null);

  constructor(protected el: ElementRef) {
    super();
    effect(() => this.handleLoading());
  }

  protected handleLoading() {
    if (this.loading() && !this.cell()?.internal) {
      if (isEqual(this.loading(), this.cell())) {
        this.loading.set(null);
      } else {
        this.cell.set({ ...this.loading()!, internal: true });
      }
    }
  }

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

  protected endEdit() {
    const editedCell = { ...this.cell(), title: { ...this.cell()?.title, label: this.getInput()?.value } };
    if (!isEqual(editedCell, this.cell())) {
      this.cell.set({ ...editedCell, internal: true });
      this.onEdit.emit(editedCell);
      this.loading.set(editedCell);
    }
    this.editing.set(false);
  }

  private getInput() {
    return this.el.nativeElement.querySelector('input');
  }

}

