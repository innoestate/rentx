import { Component, computed, effect, input, output } from '@angular/core';

@Component({
  selector: 'nz-ux-cell-editable-string',
  imports: [],
  standalone: true,
  templateUrl: './nz-ux-cell-editable-string.component.html',
  styleUrl: './nz-ux-cell-editable-string.component.scss'
})
export class NzUxCellEditableStringComponent {

  value = input.required<string>();
  editedValue = '';
  isOnEditMode = input.required<boolean>();
  isOnViewMode = computed(() => !this.isOnEditMode());
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<string>();

  constructor(){
    effect(() => {
      this.editedValue = this.value()
    })
  }

  startToEdit(){
    this.startEdit.emit();
  }

  makeEdit(event: Event){
    this.edit.emit((event.target as HTMLInputElement).value);
    this.editedValue = (event.target as HTMLInputElement).value;
  }

  endEdit(){
    this.stopEdit.emit();
  }

}
