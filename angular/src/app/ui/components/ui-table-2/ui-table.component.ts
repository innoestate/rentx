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
import { UiCell } from './models/ui-cell.model';
import { UiNestedDropdown2 } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';

@Component({
  selector: 'ui-table-2',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    UiDynamicCellComponent, UiIcon2Component],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTable2Component<T> {

  table = input.required<UiTable2>();
  editCell = output<{ id: string, updates: Partial<T> }>();

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();


  edit(cell: NzUiCell, nzRow: NzUiTable2Row, columnIndex: number) {
    const key = nzRow.cells[columnIndex].key as string;
    if(!key) throw new Error('Key not found');
    let updates = {} as any;
    if(cell.dropdown){
    }else{
      updates[key] = cell.label?.title?.label!;
    }
    this.editCell.emit({ id: nzRow.id, updates })
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
    width = '60px';
  }else if(column.cell?.type === 'dropdown-actions-icon'){
    width = '60px';
  }

  let icon = column.cell?.label?.icon;
  if(icon){
    icon = {
      size: 24,
      color: 'var(--color-secondary-500)',
      ...icon,
    };
  }

  let sort = undefined;
  if (column.cell.sort !== undefined) {
    sort = {
      priority: column.cell.sort.priority,
      function: (a: any, b: any) => sortRows(a, b, columnIndex)
    }
  }

  return {
    cell: {
      ...column.cell,
      sort,
      label: {
        ...column.cell.label,
        icon,
        title: column.cell?.label?.title ? { ...column.cell.label!.title, weight: 'bold' } : undefined
      }
    },
    width: width
  };
}

const sortRows = (rowA: NzUiTable2Row, rowB: NzUiTable2Row, columnIndex: number): number=> {
  const cellA = rowA.cells[columnIndex];
  const cellB = rowB.cells[columnIndex];
  if(isDropDownCell(cellA, cellB)) return sortDropdown(rowA.cells, rowB.cells, columnIndex);
  return sortString(rowA.cells, rowB.cells, columnIndex)
}


const sortString = (rowA: UiCell[], rowB: UiCell[], index: number): number=> {
  if(!rowA[index].label?.title?.label || !rowB[index].label?.title?.label) return 0;
  return (rowA[index].label!.title!.label!.toString().localeCompare(rowB[index].label!.title!.label!.toString()));
};

const isDropDownCell = (cellA: UiCell, cellB: UiCell ): boolean => {
  return !!cellA.dropdown && !!cellB.dropdown;
}

const sortDropdown = (rowA: UiCell[], rowB: UiCell[], index: number): number=> {
  const dropdownA = rowA[index] as UiNestedDropdown2;
  const dropdownB = rowB[index] as UiNestedDropdown2;
  if(!dropdownA?.list || !dropdownB?.list) return 0;
  return ((dropdownA?.list[0]?.label?.title?.label! + '').localeCompare(dropdownB?.list[0]?.label?.title?.label! + ''));
}

export const formatNzRows = (rows: UiTable2Row[], columns: UiTable2Column[]): NzUiTable2Row[] => {
  return rows.map((row, index) => {
    const orderedRows: NzUiCell[] = [];
    columns.forEach((column) => {

      const cell = { ...row.cells[column.key], key: column.key }

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
