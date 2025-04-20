import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, model, output, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { UiIconComponent } from '../../../ui-icon/ui-icon.component';
import { NzUiCell } from '../../models/nz-ui-cell.model';
import { UiLabelComponent } from '../ui-label/ui-label.component';
import { isEqual } from 'lodash';

@Component({
  selector: 'ui-cell',
  imports: [CommonModule, UiLabelComponent, UiIconComponent],
  templateUrl: './ui-cell.component.html',
  styleUrl: './ui-cell.component.scss'
})
export class UiCellComponent {

  cell = model.required<NzUiCell>();

  protected editing = signal(false);
  protected onEdit = output<NzUiCell>();
  protected loading = signal<boolean>(false);
  protected typing = new Subject<string>();
  protected blur = new Subject<void>();

  protected color = computed(() => {
    return (this.cell()?.color || 'transparent') + ' !important';
  });

  constructor(private el: ElementRef) {
    effect(() => {
      if (this.loading() &&!this.cell()?.internal) {
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
    const editedCell = {...this.cell(), title: { ...this.cell()?.title, label: this.getInput()?.value } };
    if(!isEqual(editedCell, this.cell())) {
      this.cell.set({...editedCell, internal: true});
      this.onEdit.emit(editedCell);
      this.loading.set(true);
    }
    this.editing.set(false);
  }

  private getInput() {
    return this.el.nativeElement.querySelector('input');
  }

}
