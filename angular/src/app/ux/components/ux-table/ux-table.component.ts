import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUxColumnConfig } from './models/nz-ux-column.config.model';
import { UxTableColumnItem } from './models/ux-table.column.model';
import { formatNzColumnConfig, formatNzRows } from './utils/utils';
import { NzUxCellEditableNumberComponent } from './nz-ux-cell-editable/number/number.component';
import { UxTableRow } from './models/ux-table-row.model';
import { CellType } from './types/ux-table.cell.type';
import { NzUxCellDropdownComponent } from './nz-ux-cell-dropdown/nz-ux-cell-dropdown.component';
import { UxDropdownItem } from '../ux-dropdown/model/ux-dropdown-item.model';
import { UxNestedDropdownComponent } from "../ux-nested-dropdown/ux-nested-dropdown.component";
import { NzUxCellEditableStringComponent } from './nz-ux-cell-editable/string/string.component';


@Component({
  selector: 'ux-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzUxCellEditableStringComponent,
    NzUxCellEditableNumberComponent,
    NzUxCellDropdownComponent,
    UxNestedDropdownComponent],
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

  private buildNzColumns(): Signal<NzUxColumnConfig[]> {
    return computed(() => this.columns().map((column, columnIndex) => formatNzColumnConfig(column, columnIndex)))
  }

  private buildNzRows(): Signal<CellType[][]> {
    return computed(() => formatNzRows(this.rows(), this.columns()));
  }
}
