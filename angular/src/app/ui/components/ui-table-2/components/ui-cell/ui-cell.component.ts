import { CommonModule } from '@angular/common';
import { Component, computed, model, output } from '@angular/core';
import { NzUiCell } from '../../models/nz-ui-cell.model';
import { UiLabel2Component } from '../ui-label/ui-label.component';

@Component({
  selector: 'ui-cell',
  imports: [CommonModule, UiLabel2Component],
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
