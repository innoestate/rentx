import { Component, computed, effect, input, output } from '@angular/core';
import { NzUxCellEditableComponent } from '../nz-ux-cell-editable.component';

@Component({
  selector: 'nz-ux-cell-editable-number',
  imports: [],
  standalone: true,
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NzUxCellEditableNumberComponent extends NzUxCellEditableComponent { }
