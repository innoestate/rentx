import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUxColumnConfig } from './models/nz-ux-column.config.model';
import { CELL_TYPE as CELL_TYPE_ENUM } from './models/ux-table.cell-types';
import { UxTableColumnItem } from './models/ux-table.column.model';
import { NzUxCellEditableStringComponent } from './nz-ux-cell-editable-string/nz-ux-cell-editable-string.component';
import { formatNzColumnConfig } from './utils/utils';
import { NzUxCellEditableNumberComponent } from './nz-ux-cell-editable-number/nz-ux-cell-editable-number.component';

interface Row {
  [key: string]: any;
}

@Component({
  selector: 'ux-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzUxCellEditableStringComponent,
    NzUxCellEditableNumberComponent],
  templateUrl: './ux-table.component.html',
  styleUrl: './ux-table.component.scss'
})
export class UxTableComponent<T extends Row> {

  CELL_TYPE = CELL_TYPE_ENUM;
  rows = input.required<T[]>();
  columns = input.required<UxTableColumnItem[]>();
  editRow = output<T>();

  nzRows: Signal<string[][]> = this.buildNzRows();
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
    const row = this.rows()[rowIndex] as Row;
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

  private buildNzRows(): Signal<string[][]> {
    return computed(() => {
      return this.rows().map(row => {
        const alignedRows: string[] = [];
        this.columns().forEach((column) => {
          alignedRows.push(row[column.key])
        });
        return alignedRows;
      });
    });
  }

  private buildNzColumns(): Signal<NzUxColumnConfig[]> {
    return computed(() => this.columns().map((column, columnIndex) => formatNzColumnConfig(column, columnIndex)))
  }

}
