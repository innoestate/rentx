import { computed, Directive, effect, input, output } from '@angular/core';
import { CellType } from '../types/ux-table.cell.type';

@Directive()
export class NzUxCellEditableComponent {

  value = input.required<CellType>();
  isOnEditMode = input.required<boolean>();
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<string>();

  protected isOnViewMode = computed(() => !this.isOnEditMode());
  protected insideValue = '';

  constructor(){
    this.fitInsideValue();
  }

  startToEdit(){
    this.startEdit.emit();
  }

  makeEdit(event: Event){
    this.edit.emit((event.target as HTMLInputElement).value);
    this.insideValue = (event.target as HTMLInputElement).value;
  }

  endEdit(){
    this.stopEdit.emit();
  }

  protected fitInsideValue(){
    effect(() => {
      this.insideValue = this.value() as string;
    })
  }

}
