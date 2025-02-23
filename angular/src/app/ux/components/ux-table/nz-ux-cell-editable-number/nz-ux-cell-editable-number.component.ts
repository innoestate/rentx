import { Component, computed, effect, input, output } from '@angular/core';
import { CellType } from '../types/ux-table.cell.type';

@Component({
  selector: 'nz-ux-cell-editable-number',
  imports: [],
  standalone: true,
  templateUrl: './nz-ux-cell-editable-number.component.html',
  styleUrl: './nz-ux-cell-editable-number.component.scss'
})
export class NzUxCellEditableNumberComponent {

  value = input.required<CellType>();
  editedValue = 0;
  isOnEditMode = input.required<boolean>();
  isOnViewMode = computed(() => !this.isOnEditMode());
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<number>();

  constructor(){
    effect(() => {
      this.editedValue = this.value() as number;
    })
  }

  startToEdit(){
    this.startEdit.emit();
  }

  makeEdit(event: Event){
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.edit.emit(value);
    this.editedValue = value;
  }

  endEdit(){
    this.stopEdit.emit();
  }

}
