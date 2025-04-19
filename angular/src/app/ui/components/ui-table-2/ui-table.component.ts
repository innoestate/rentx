import { CommonModule } from '@angular/common';
import { Component, computed, input, output, Signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';
import { UiTable2Row } from './models/ui-table-row.model';
import { UiTable2 } from './models/ui-table.model';
import { UiTable2Column } from './models/ui-table.column.model';
import { NzUiTable2Column } from './models/nz-ui-table-column.model';
import { NzUiTable2Row } from './models/nz-ui-table-row.model';
import { UiLabel } from './models/ui-label.model';

@Component({
  selector: 'ui-table-2',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    UiIconComponent,
    UiPaginationComponent],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTable2Component {

  @ViewChild('tableRef') tableRef!: NzTableComponent<UiTable2>;

  table = input.required<UiTable2>();
  editRow = output<UiTable2Row>();

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();

  private buildNzColumns(): Signal<UiTable2Column[]> {
    return computed(() => this.table().columns());
  }

  private buildNzRows(): Signal<NzUiTable2Row[]> {
    return computed(() => formatNzRows(this.table().rows(), this.table().columns()));
  }

}

export const formatColumn = (column: UiTable2Column, columnIndex: number): NzUiTable2Column => {;
  return { label: column.label};
}


export const formatNzRows = (rows: UiTable2Row[], columns: UiTable2Column[]): NzUiTable2Row[] => {
  return rows.map((row, index) => {
    const orderedRows: UiLabel[] = [];
    columns.forEach((column) => {
      orderedRows.push(row.cells[column.key] as UiLabel);
    });
    return { inputRowIndex: index, data: row.data, cells: orderedRows };
  });
}