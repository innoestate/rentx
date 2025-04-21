import { Component, ComponentRef, effect, input, OnInit, output, ViewContainerRef } from '@angular/core';
import { NzUiCell } from '../../models/nz-ui-cell.model';
import { UiCellComponent } from '../ui-cell/ui-cell.component';
import { UiCellIconComponent } from '../ui-cell/ui-cell-icon/ui-cell-icon.component';
import { UiCellEditableNumberComponent } from '../ui-cell/ui-cell-editable/ui-cell-editable-input/ui-cell-editable-number/ui-cell-editable-number.component';
import { UiCellEditableStringComponent } from '../ui-cell/ui-cell-editable/ui-cell-editable-input/ui-cell-editable-string/ui-cell-editable-string.component';
import { UiCellDropdownActionsComponent } from '../ui-cell/ui-cell-dropdown-actions/ui-cell-dropdown-actions.component';
import { UiCellDropdownSelectComponent } from '../ui-cell/ui-cell-editable/ui-cell-dropdown-select/ui-cell-dropdown-select.component';

@Component({
  selector: 'ui-dynamic-cell',
  imports: [UiCellComponent],
  templateUrl: './ui-dynamic-cell.component.html',
  styleUrl: './ui-dynamic-cell.component.scss'
})
export class UiDynamicCellComponent implements OnInit {

  cell = input.required<NzUiCell>();
  onEdit = output<NzUiCell>();

  private componentRef!: ComponentRef<UiCellComponent>;

  constructor(private viewContainerRef: ViewContainerRef) {
    effect(() => {
      if (this.componentRef) {
        this.componentRef.setInput('cell', this.cell());
      }
    })
  }

  ngOnInit(): void {
    if(this.cell()?.type === 'dropdown-select') {
      this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellDropdownSelectComponent);
    }else if (this.cell()?.editable) {
      if (this.cell()?.type === 'number') {
        this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellEditableNumberComponent);
      } else {
        this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellEditableStringComponent);
      }
    } else if(this.cell()?.type === 'dropdown-actions') {
      this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellDropdownActionsComponent);
    } else if (this.cell()?.type === 'icon') {
      this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellIconComponent);
    } else {
      this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellComponent);
    }
    this.componentRef.setInput('cell', this.cell());
    this.componentRef.instance.onEdit.subscribe((event) => {
      this.onEdit.emit(event);
    });
  }


}
