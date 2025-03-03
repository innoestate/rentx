import { computed, Directive, effect, input, output, signal } from '@angular/core';
import { CellType } from '../types/ui-table.cell.type';
import { NzUiTableRow } from '../models/nz-ui-table-row.model';

@Directive()
export class NzUxCellEditableComponent {

  row = input.required<NzUiTableRow>();
  value = input.required<CellType>();
  isOnEditMode = signal(false);
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<CellType>();

  protected isOnViewMode = computed(() => !this.isOnEditMode());
  protected insideValue = signal<CellType>(undefined!);
  protected loadingValue = this.computeLoadingValue();

  constructor(){
    this.fitInsideValue();
  }

  startToEdit(){
    this.isOnEditMode.set(true);
    this.startEdit.emit();
  }

  makeEdit(event: Event){
    this.edit.emit((event.target as HTMLInputElement).value);
    this.insideValue.set((event.target as HTMLInputElement).value);
  }

  endEdit(){
    this.isOnEditMode.set(false);
    this.stopEdit.emit();
  }

  protected fitInsideValue(){
    effect(() => {
      this.insideValue.set(this.value());
    })
  }

  private computeLoadingValue(){
    return computed(() => {
      const frontendValue = this.insideValue();
      const backendValue = this.value();
      return frontendValue !== backendValue;
    })
  }

}
