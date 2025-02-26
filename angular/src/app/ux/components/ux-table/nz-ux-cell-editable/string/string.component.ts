import { Component, computed, effect, input, output } from '@angular/core';
import { CellType } from '../../types/ux-table.cell.type';
import { NzUxCellEditableComponent } from '../nz-ux-cell-editable.component';

@Component({
  selector: 'nz-ux-cell-editable-string',
  imports: [],
  standalone: true,
  templateUrl: './string.component.html',
  styleUrl: './string.component.scss'
})
export class NzUxCellEditableStringComponent extends NzUxCellEditableComponent {}
