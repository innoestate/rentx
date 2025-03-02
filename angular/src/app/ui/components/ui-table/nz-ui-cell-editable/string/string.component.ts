import { Component, computed, effect, input, output } from '@angular/core';
import { CellType } from '../../types/ui-table.cell.type';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.component';

@Component({
  selector: 'nz-ui-cell-editable-string',
  imports: [],
  standalone: true,
  templateUrl: './string.component.html',
  styleUrl: './string.component.scss'
})
export class NzUxCellEditableStringComponent extends NzUxCellEditableComponent {}
