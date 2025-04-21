import { CommonModule } from '@angular/common';
import { Component, computed, model, output } from '@angular/core';
import { NzUiCell } from '../../models/nz-ui-cell.model';
import { UiLabel2Component } from '../ui-label/ui-label.component';
import { UiLabel2 } from '../ui-label/models/ui-label.model';

@Component({
  selector: 'ui-cell',
  imports: [CommonModule, UiLabel2Component],
  templateUrl: './ui-cell.component.html',
  styleUrl: './ui-cell.component.scss'
})
export class UiCellComponent {

  cell = model.required<NzUiCell>();
  onEdit = output<NzUiCell>();

  label = computed<UiLabel2>(() => this.cell().label!);
  active = computed(() => {
    return this.cell().dropdown || this.cell().editable || !!(this.label()?.command || this.label()?.icon?.command);
  });

  protected color = computed(() => {
    return (this.label()?.color || 'transparent') + ' !important';
  });

}
