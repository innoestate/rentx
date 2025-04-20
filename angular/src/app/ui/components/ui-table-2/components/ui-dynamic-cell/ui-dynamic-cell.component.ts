import { Component, ComponentRef, effect, input, OnInit, output, ViewContainerRef } from '@angular/core';
import { NzUiCell } from '../../models/nz-ui-cell.model';
import { UiCellEditableStringComponent } from '../ui-cell/ui-cell-editable-string/ui-cell-editable-string.component';
import { UiCellComponent } from '../ui-cell/ui-cell.component';
import { UiCellEditableNumberComponent } from '../ui-cell/ui-cell-editable-number/ui-cell-editable-number.component';

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
      if(this.componentRef){
        this.componentRef.setInput('cell', this.cell());
      }
    })
  }

  ngOnInit(): void {
    if(this.cell()?.editable){
      if(this.cell()?.type === 'number'){
        this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellEditableNumberComponent);
      }else{
        this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellEditableStringComponent);
      }
      this.componentRef.instance.onEdit.subscribe((event) => {
        this.onEdit.emit(event);
      });
    }else{
      this.componentRef = this.viewContainerRef.createComponent<UiCellComponent>(UiCellComponent);
    }
    this.componentRef.setInput('cell', this.cell());
  }


}
