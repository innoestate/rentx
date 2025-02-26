import { Component } from '@angular/core';
import { NzUxCellEditableComponent } from '../nz-ux-cell-editable.component';

@Component({
  selector: 'nz-ux-cell-editable-number',
  imports: [],
  standalone: true,
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NzUxCellEditableNumberComponent extends NzUxCellEditableComponent {

  protected override insideValue!: number;

  override makeEdit(event: Event){
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.edit.emit(value);
    this.insideValue = value;
  }

}
