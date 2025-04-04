import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, input, output, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUiColumnConfig } from './models/nz-ui-column.config.model';
import { NzUiTableRow } from './models/nz-ui-table-row.model';
import { UiTableRow } from './models/ui-table-row.model';
import { UiTableColumnItem } from './models/ui-table.column.model';
import { NzUiCellNestedDropdownComponent } from './nz-ui-cell-editable/nested-dropdown/nz-ui-cell-nested-dropdown.component';
import { NzUxCellEditableNumberComponent } from './nz-ui-cell-editable/number/nz-ui-cell-editable-number.component';
import { NzUxCellEditableStringComponent } from './nz-ui-cell-editable/string/nz-ui-cell-editable-string.component';
import { NzUxCellItemComponent } from './nz-ui-cell-item/nz-ui-cell-item.component';
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
export class UiTableComponent {

  rows = input.required<UiTableRow[]>();
  columns = input.required<UiTableColumnItem[]>();
  editRow = output<UiTableRow>();

  protected nzRows: Signal<NzUiTableRow[]> = this.buildNzRows();
  protected nzColumns: Signal<NzUiColumnConfig[]> = this.buildNzColumns();
  protected editId: string | null = null;

  constructor(elRef: ElementRef) {
    elRef.nativeElement.classList.add('ui-table-header');
  }

  startEdit(columnIndex: number, rowIndex: number) {
    this.editId = (columnIndex + this.columns()[rowIndex].key);
  }

  edit(value: any, nzRow: NzUiTableRow, columnIndex: number) {
    const row = this.rows()[nzRow.inputRowIndex];
    const key = this.columns()[columnIndex].key;
    const newRow = { ...row, cells: { [key]: value } } as UiTableRow;
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

  private buildNzRows(): Signal<NzUiTableRow[]> {
    return computed(() => formatNzRows(this.rows(), this.columns()));
  }
}
