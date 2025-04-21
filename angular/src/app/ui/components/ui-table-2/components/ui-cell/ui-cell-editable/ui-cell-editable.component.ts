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
      if (this.valueMatchFromExternal()) {
        this.loading.set(null);
      } else {
        this.cell.set({ ...this.cell()!, internal: true });
      }
    }
  }

  protected valueMatchFromExternal() {
    const cellWithoutInternal = { ...this.cell()! };
    delete cellWithoutInternal.internal;
    const loadingWithoutInternal = { ...this.loading()! };
    delete loadingWithoutInternal.internal;
    return isEqual(loadingWithoutInternal, cellWithoutInternal);
  }

  protected endEdit() {}
}

