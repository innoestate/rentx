import { Component, computed, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.directive';

@Component({
  selector: 'nz-ui-cell-editable-string',
  imports: [],
  standalone: true,
  templateUrl: './nz-ui-cell-editable-string.component.html',
  styleUrl: './nz-ui-cell-editable-string.component.scss'
})
export class NzUxCellEditableStringComponent extends NzUxCellEditableComponent {

  @ViewChild('input') inputValue!: ElementRef<HTMLInputElement>;
  isEmpty = this.checkIfValueIsEmpty();

  @HostListener('click')
  onClick() {
    this.startToEdit();
  }

  override startToEdit(){
    super.startToEdit();
    setTimeout(() => {
      this.inputValue.nativeElement.focus();
    }, 0);
  }

  private checkIfValueIsEmpty(){
    return computed(() => {
      return (!this.insideValue() || this.insideValue() === '');
    })
  }

}
