import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, signal } from '@angular/core';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';
import { UiIconComponent } from 'src/app/ui/components/ui-icon/ui-icon.component';
import { UiLabelComponent } from '../../ui-label/ui-label.component';
import { UiCellComponent } from '../ui-cell.component';
import { NzUiCell } from '../../../models/nz-ui-cell.model';
import { UiCellEditableComponent } from '../ui-cell-editable/ui-cell-editable.component';

@Component({
  selector: 'ui-cell-editable-string',
  imports: [CommonModule, UiLabelComponent, UiIconComponent],
  templateUrl: './ui-cell-editable-string.component.html',
  styleUrl: './ui-cell-editable-string.component.scss'
})
export class UiCellEditableStringComponent extends UiCellEditableComponent {}

