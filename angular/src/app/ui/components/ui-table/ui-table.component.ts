import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUiColumnConfig } from './models/nz-ui-column.config.model';
import { UiTableRow } from './models/ui-table-row.model';
import { UiTableColumnItem } from './models/ui-table.column.model';
import { NzUiCellNestedDropdownComponent } from './nz-ui-cell-editable/nested-dropdown/nz-ui-cell-nested-dropdown.component';
import { NzUxCellEditableNumberComponent } from './nz-ui-cell-editable/number/number.component';
import { NzUxCellEditableStringComponent } from './nz-ui-cell-editable/string/string.component';
import { NzUxCellItemComponent } from './nz-ui-cell-item/nz-ui-cell-item.component';
import { CellType } from './types/ui-table.cell.type';
import { formatNzColumnConfig, formatNzRows } from './utils/utils';


@Component({
  selector: 'ui-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzIconModule,
    NzUxCellEditableStringComponent,
    NzUxCellEditableNumberComponent,
    NzUiCellNestedDropdownComponent,
    NzUxCellItemComponent,
  ],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent<T extends UiTableRow> {

  rows = input.required<T[]>();
  columns = input.required<UiTableColumnItem[]>();
  editRow = output<T>();

  nzRows: Signal<CellType[][]> = this.buildNzRows();
  nzColumns: Signal<NzUiColumnConfig[]> = this.buildNzColumns();
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
    const row = this.rows()[rowIndex] as UiTableRow;
    const key = this.columns()[columnIndex].key;
    const newRow = { ...row, [key]: value } as T;
    this.editRow.emit(newRow);
    this.editId = null;
  }

  stopEdit(): void {
    this.editId = null;
  }

  isUiItem(cell: any | any): boolean {
    return cell instanceof Object;
  }

  private buildNzColumns(): Signal<NzUiColumnConfig[]> {
    return computed(() => this.columns().map((column, columnIndex) => formatNzColumnConfig(column, columnIndex)))
  }

  private buildNzRows(): Signal<CellType[][]> {
    return computed(() => formatNzRows(this.rows(), this.columns()));
  }
}
