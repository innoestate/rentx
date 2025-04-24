import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, input, model, output, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject } from 'rxjs';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';
import { UiDynamicCellComponent } from "./components/ui-dynamic-cell/ui-dynamic-cell.component";
import { NzUiCell } from './models/nz-ui-cell.model';
import { NzUiTable2Column } from './models/nz-ui-table-column.model';
import { NzUiTable2Row } from './models/nz-ui-table-row.model';
import { UiCell } from './models/ui-cell.model';
import { UiTable2Row } from './models/ui-table-row.model';
import { UiTable2Column } from './models/ui-table.column.model';
import { UiTable2 } from './models/ui-table.model';
import { formatColumn } from './utils/ui-table.column.utils';
import { getSizing } from './utils/ui-table.sizing.utils';
import { formatNzRows } from './utils/ui-table.rows.utils';

@Component({
  selector: 'ui-table',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    UiDynamicCellComponent,
    UiIconComponent,
    UiPaginationComponent],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent<T> {

  @ViewChild('tableRef') tableRef!: NzTableComponent<UiTable2Row>;
  table = input.required<UiTable2>();
  editCell = output<{ id: string, key: string, cell: UiCell }>();
  rowsPerPages = toSignal(getSizing(this.elRef));// signal(10);

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();
  protected displayedTotal$ = new BehaviorSubject<number>(0);
  protected displayedTotal = toSignal(this.displayedTotal$);
  protected pageIndex = model<number>(1);

  protected pages = computed(() => {
    const rowsPerPage = this.rowsPerPages()!;
    if (!this.displayedTotal()) return Math.ceil(this.nzRows().length / rowsPerPage as any);
    return Math.ceil(this.displayedTotal()! / rowsPerPage);
  })

  constructor(private elRef: ElementRef) { }

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
    if (this.tableRef?.nzTotal !== undefined) {
      const total = this.tableRef.nzTotal;
      this.displayedTotal$.next(total);
    }
  }

}
