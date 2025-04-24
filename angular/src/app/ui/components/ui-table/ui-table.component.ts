import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, input, model, output, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';
import { UiDynamicCellComponent } from "./components/ui-dynamic-cell/ui-dynamic-cell.component";
import { NzUiCell } from './models/nz-ui-cell.model';
import { NzUiTable2Column } from './models/nz-ui-table-column.model';
import { NzUiTable2Row } from './models/nz-ui-table-row.model';
import { UiCell } from './models/ui-cell.model';
import { UiTable2Row } from './models/ui-table-row.model';
import { UiTable2 } from './models/ui-table.model';
import { Pagination } from './services/ui-table.pagination.utils';
import { formatColumn } from './utils/ui-table.column.utils';
import { formatNzRows } from './utils/ui-table.rows.utils';
import { getSizing } from './utils/ui-table.sizing.utils';

@Component({
  selector: 'ui-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    UiDynamicCellComponent,
    UiIconComponent,
    UiPaginationComponent],
  providers: [Pagination],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent<T> {

  @ViewChild('tableRef') tableRef!: NzTableComponent<UiTable2Row>;
  table = input.required<UiTable2>();
  editCell = output<{ id: string, key: string, cell: UiCell }>();
  rowsPerPages = toSignal(getSizing(this.elRef));

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();
  protected pageIndex = model<number>(1);
  protected pagesNumber = computed(() => this.pagination.getPageNumber(this.nzRows().length, this.rowsPerPages() ?? 1))

  constructor(private elRef: ElementRef, protected pagination: Pagination) {}

  edit(cell: NzUiCell, nzRow: NzUiTable2Row, columnIndex: number) {
    const key = nzRow.cells[columnIndex].key as string;
    if (!key) throw new Error('Key not found');
    this.editCell.emit({ id: nzRow.id, key, cell })
  }

  private buildNzColumns(): Signal<NzUiTable2Column[]> {
    return computed(() => this.table().columns().map((column, index) => formatColumn(column, index)));
  }

  private buildNzRows(): Signal<NzUiTable2Row[]> {
    return computed(() => formatNzRows(this.table().rows(), this.table().columns()));
  }

  handleCurrentPageDataChange(): void {
    this.pagination.setTotal();
  }

}
