import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, model, output, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { UiIconComponent } from '../../../ui-icon/ui-icon.component';
import { NzUiCell } from '../../models/nz-ui-cell.model';
import { UiLabelComponent } from '../ui-label/ui-label.component';
import { isEqual } from 'lodash';

@Component({
  selector: 'ui-cell',
  imports: [CommonModule, UiLabelComponent],
  templateUrl: './ui-cell.component.html',
  styleUrl: './ui-cell.component.scss'
})
export class UiCellComponent {

  cell = model.required<NzUiCell>();
  onEdit = output<NzUiCell>();

  protected color = computed(() => {
    return (this.cell()?.color || 'transparent') + ' !important';
  });

}
