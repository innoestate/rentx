import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, Signal } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UxTableColumnItem } from '../models/ux-table.model';

@Component({
  selector: 'ux-table',
  imports: [CommonModule, NzTableModule],
  templateUrl: './ux-table.component.html',
  styleUrl: './ux-table.component.scss'
})
export class UxTableComponent {

  rows = input.required<any[]>();
  columns = input.required<UxTableColumnItem[]>();

  nzRows = this.buildNzRows();

  constructor() {
    effect(() => {
      this.nzRows = this.buildNzRows();
    })
  }

  private buildNzRows(): Signal<any[]> {
    return computed(() => {
      return this.rows().map(row => {
        const alignedRows: any[] = [];
        this.columns().forEach( (column) => {
          alignedRows.push(row[column.key])
        });
        return alignedRows;
      });
    });
  }

}
