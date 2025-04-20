import { Component, effect, ElementRef, input, output, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { NzUiCell } from '../../../models/nz-ui-cell.model';
import { UiCellComponent } from '../ui-cell.component';
import { isEqual } from 'lodash';
import { CommonModule } from '@angular/common';
import { UiLabelComponent } from '../../ui-label/ui-label.component';
import { UiIconComponent } from 'src/app/ui/components/ui-icon/ui-icon.component';

@Component({
  selector: 'ui-cell-editable-string',
  imports: [CommonModule, UiLabelComponent, UiIconComponent],
  templateUrl: './ui-cell-editable-string.component.html',
  styleUrl: './ui-cell-editable-string.component.scss'
})
export class UiCellEditableStringComponent extends UiCellComponent {

  protected editing = signal(false);
  protected loading = signal<boolean>(false);
  protected typing = new Subject<string>();
  protected blur = new Subject<void>();

  constructor(private el: ElementRef) {
    super();
    effect(() => {
      if (this.loading() && !this.cell()?.internal) {
        this.loading.set(false);
      }
    })
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
      this.loading.set(true);
    }
    this.editing.set(false);
  }

  private getInput() {
    return this.el.nativeElement.querySelector('input');
  }

}

