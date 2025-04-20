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
import { UiCell } from './models/ui-cell.model';
import { UiCellComponent } from './components/ui-cell/ui-cell.component';
import { NzUiCell } from './models/nz-ui-cell.model';
import { UiDynamicCellComponent } from "./components/ui-dynamic-cell/ui-dynamic-cell.component";

@Component({
  selector: 'ui-table-2',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    UiIconComponent,
    UiCellComponent,
    UiPaginationComponent, UiDynamicCellComponent],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTable2Component {

  @ViewChild('tableRef') tableRef!: NzTableComponent<UiTable2>;

  table = input.required<UiTable2>();
  editCell = output<{ id: string, key: string, cell: UiCell }>();

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();


  edit(cell: NzUiCell, nzRow: NzUiTable2Row, columnIndex: number) {
    this.editCell.emit({ id: nzRow.id, key: nzRow.cells[columnIndex].key, cell })
  }

  private buildNzColumns(): Signal<NzUiTable2Column[]> {
    return computed(() => this.table().columns().map((column, index) => formatColumn(column, index)));
  }

  private buildNzRows(): Signal<NzUiTable2Row[]> {
    return computed(() => formatNzRows(this.table().rows(), this.table().columns()));
  }

}

export const formatColumn = (column: UiTable2Column, columnIndex: number): NzUiTable2Column => {

  let width = undefined;
  if(column.cell.type === 'mediumString'){
    width = '150px';
  }else if(column.cell.type === 'smallString'){
    width = '100px';
  }else if(column.cell?.type === 'longString'){
    width = '200px';
  }else if(column.cell?.type === 'fullSizeString'){
    width = '100%';
  }else if(column.cell?.type === 'number'){
    width = '60px';
  }else if(column.cell?.type === 'longNumber'){
    width = '110px';
  }else if(column.cell?.type === 'icon'){
    width = '20px';
  }

  let icon = column.cell?.icon;
  if(icon){
    icon = {
      size: 22,
      ...icon,
    };
  }

  return {
    cell: {
      ...column.cell,
      icon,
      title: column.cell?.title ? { ...column.cell!.title, weight: 'bold' } : undefined
    },
    width: width
  };
}


export const formatNzRows = (rows: UiTable2Row[], columns: UiTable2Column[]): NzUiTable2Row[] => {
  return rows.map((row, index) => {
    const orderedRows: NzUiCell[] = [];
    columns.forEach((column) => {
      orderedRows.push({ ...row.cells[column.key], key: column.key });
    });
    return { inputRowIndex: index, id: row.data.id, cells: orderedRows };
  });
}
