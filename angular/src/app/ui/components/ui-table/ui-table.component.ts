import { CommonModule } from '@angular/common';
import { Component, computed, input, output, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UiIcon2Component } from "../ui-icon/ui-icon2.component";
import { UiDynamicCellComponent } from "./components/ui-dynamic-cell/ui-dynamic-cell.component";
import { NzUiCell } from './models/nz-ui-cell.model';
import { NzUiTable2Column } from './models/nz-ui-table-column.model';
import { NzUiTable2Row } from './models/nz-ui-table-row.model';
import { UiTable2Row } from './models/ui-table-row.model';
import { UiTable2Column } from './models/ui-table.column.model';
import { UiTable2 } from './models/ui-table.model';
import { UiCell, UiCellBasic } from './models/ui-cell.model';
import { UiNestedDropdown2 } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';
import { formatColumn } from './utils/ui-table.column.utils';

@Component({
  selector: 'ui-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    UiDynamicCellComponent, UiIcon2Component],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent<T> {

  table = input.required<UiTable2>();
  editCell = output<{ id: string, key: string, cell: UiCell}>();

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();


  edit(cell: NzUiCell, nzRow: NzUiTable2Row, columnIndex: number) {
    const key = nzRow.cells[columnIndex].key as string;
    if(!key) throw new Error('Key not found');
    this.editCell.emit({ id: nzRow.id, key, cell })
  }

  private buildNzColumns(): Signal<NzUiTable2Column[]> {
    return computed(() => this.table().columns().map((column, index) => formatColumn(column, index)));
  }

  private buildNzRows(): Signal<NzUiTable2Row[]> {
    return computed(() => formatNzRows(this.table().rows(), this.table().columns()));
  }

}

export const formatNzRows = (rows: UiTable2Row[], columns: UiTable2Column[]): NzUiTable2Row[] => {
  return rows.map((row, index) => {
    const orderedRows: NzUiCell[] = [];
    columns.forEach((column) => {

      const cell: NzUiCell = { ...row.cells[column.key], key: column.key }

      if(cell.label?.icon){
        cell.label.icon = {
          size: 18,
          color: 'var(--color-tertiary-500)',
          ...cell.label.icon,
        };
      }

      orderedRows.push(cell);
    });
    return { inputRowIndex: index, id: row.data.id, cells: orderedRows };
  });
}
