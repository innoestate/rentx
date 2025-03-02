import { Component, signal } from '@angular/core';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.directive';

@Component({
  selector: 'nz-ui-cell-editable-number',
  imports: [],
  standalone: true,
  templateUrl: './nz-ui-cell-editable-number.component.html',
  styleUrl: './nz-ui-cell-editable-number.component.scss'
})
export class NzUxCellEditableNumberComponent extends NzUxCellEditableComponent {

  protected override insideValue = signal<number>(0);

  override makeEdit(event: Event){
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.edit.emit(value);
    this.insideValue.set(value);
  }

}
