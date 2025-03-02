import { computed, Directive, effect, input, output, signal } from '@angular/core';
import { CellType } from '../types/ui-table.cell.type';

@Directive()
export class NzUxCellEditableComponent {

  value = input.required<CellType>();
  isOnEditMode = signal(false);
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<CellType>();

  protected isOnViewMode = computed(() => !this.isOnEditMode());
  protected insideValue = signal<CellType>(undefined!);


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

}
