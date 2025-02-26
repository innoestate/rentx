import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UxDropdownItem } from '../ux-dropdown/model/ux-dropdown-item.model';
import { NzUxColumnConfig } from './models/nz-ux-column.config.model';
import { UxTableRow } from './models/ux-table-row.model';
import { UxTableColumnItem } from './models/ux-table.column.model';
import { NzUxCellDropdownComponent } from './nz-ux-cell-editable/dropdown/dropdown.component';
import { NzUxCellNestedDropdownComponent } from './nz-ux-cell-editable/nested-dropdown/string.component';
import { NzUxCellEditableNumberComponent } from './nz-ux-cell-editable/number/number.component';
import { NzUxCellEditableStringComponent } from './nz-ux-cell-editable/string/string.component';
import { NzUxCellItemComponent } from './nz-ux-cell-item/nz-ux-cell-item.component';
import { CellType } from './types/ux-table.cell.type';
import { formatNzColumnConfig, formatNzRows } from './utils/utils';


@Component({
  selector: 'ux-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzUxCellEditableStringComponent,
    NzUxCellEditableNumberComponent,
    NzUxCellDropdownComponent,
    NzUxCellNestedDropdownComponent,
    NzUxCellItemComponent,
  ],
  templateUrl: './ux-table.component.html',
  styleUrl: './ux-table.component.scss'
})
export class UxTableComponent<T extends UxTableRow> {

  rows = input.required<T[]>();
  columns = input.required<UxTableColumnItem[]>();
  editRow = output<T>();

  nzRows: Signal<CellType[][]> = this.buildNzRows();
  nzColumns: Signal<NzUxColumnConfig[]> = this.buildNzColumns();
  editId: string | null = null;

  constructor() {
    effect(() => {
      this.nzRows = this.buildNzRows();
    })
  }

  startEdit(columnIndex: number, rowIndex: number) {
    this.editId = (columnIndex + this.columns()[rowIndex].key);
  }

  edit(value: any, rowIndex: number, columnIndex: number) {
    const row = this.rows()[rowIndex] as UxTableRow;
    const key = this.columns()[columnIndex].key;
    const newRow = { ...row, [key]: value } as T;
    this.editRow.emit(newRow);
  }

  stopEdit(): void {
    this.editId = null;
  }

  isCellOnEditMode(columnIndex: number, rowIndex: number): boolean {
    return this.editId === (columnIndex + this.columns()[rowIndex].key);
  }

  isNestedDropdown(cell: UxDropdownItem<any> | any): boolean {
    return (cell as UxDropdownItem<any>[] ?? []).reduce((acc, cur) => {
      if (Array.isArray(cur.target)) return true;
      return acc;
    }, false);
  }

  isUxItem(cell: any | any): boolean {
    return cell instanceof Object;
  }

  private buildNzColumns(): Signal<NzUxColumnConfig[]> {
    return computed(() => this.columns().map((column, columnIndex) => formatNzColumnConfig(column, columnIndex)))
  }

  private buildNzRows(): Signal<CellType[][]> {
    return computed(() => formatNzRows(this.rows(), this.columns()));
  }
}
