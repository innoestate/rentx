import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, input, model, output, signal, Signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { UiDynamicCellComponent } from "./components/ui-dynamic-cell/ui-dynamic-cell.component";
import { NzUiCell } from './models/nz-ui-cell.model';
import { NzUiTable2Column } from './models/nz-ui-table-column.model';
import { NzUiTable2Row } from './models/nz-ui-table-row.model';
import { UiCell } from './models/ui-cell.model';
import { UiTable2Row } from './models/ui-table-row.model';
import { UiTable2Column } from './models/ui-table.column.model';
import { UiTable2 } from './models/ui-table.model';
import { formatColumn } from './utils/ui-table.column.utils';
import { BehaviorSubject, from, take, tap } from 'rxjs';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';

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
export class UiTableComponent<T> implements AfterViewInit {

  @ViewChild('tableRef') tableRef!: NzTableComponent<UiTable2Row>;
  table = input.required<UiTable2>();
  editCell = output<{ id: string, key: string, cell: UiCell }>();
  rowsPerPages = signal(10);

  protected nzRows: Signal<any[]> = this.buildNzRows();
  protected nzColumns: Signal<any[]> = this.buildNzColumns();
  protected displayedTotal$ = new BehaviorSubject<number>(0);
  protected displayedTotal = toSignal(this.displayedTotal$);
  protected pageIndex = model<number>(1);



  protected pages = computed(() => {
    const rowsPerPage = this.rowsPerPages();
    if (!this.displayedTotal()) return Math.ceil(this.nzRows().length / rowsPerPage);
    return Math.ceil(this.displayedTotal()! / rowsPerPage);
  })

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.iniSizing();
  }

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

  private iniSizing() {
    from(this.htmlRowsAreLoaded()).pipe(
      take(1),
      tap(() => {
        const heights = this.getHeights();
        this.calculateRowsPerPages(heights);
        console.log('heights', heights);
        console.log('rows per page', this.rowsPerPages());
        // this.drawBackground(heights);
      })).subscribe();
  }

  private getHeights() {

    const rows = this.elRef.nativeElement.querySelectorAll('.ant-table-row');

    const table = this.elRef.nativeElement.querySelector('.ant-table-wrapper')?.getBoundingClientRect().height || 0;
    const head = this.elRef.nativeElement.querySelector('.ant-table-thead')?.getBoundingClientRect().height || 0;
    const row = rows?.length ? rows[1]?.getBoundingClientRect().height : 40;
    const footer = this.elRef.nativeElement.querySelector('.ui-table-footer')?.getBoundingClientRect().height || 0;

    return { table, head, row, footer };
  }

  private calculateRowsPerPages(heights: { table: number, head: number, row: number, footer: number }) {
    const bodyHeight = heights.table - heights.head - heights.footer;
    const rowsPerPages = Math.floor(bodyHeight / heights.row);
    this.rowsPerPages.set(rowsPerPages);
  }

  private hasRowsAfterHeader() {
    let rows = document.querySelectorAll('.ant-table-row');
    if (rows.length > 1) {
      return true;
    }
    return false;
  }

  private htmlRowsAreLoaded(): Promise<any> {
    return new Promise(resolve => {
      const observer = new MutationObserver(() => {
        if (this.hasRowsAfterHeader()) {
          resolve(true)
          observer.disconnect();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  handleCurrentPageDataChange(changes: any): void {
    if (this.tableRef?.nzTotal !== undefined) {
      const total = this.tableRef.nzTotal;
      this.displayedTotal$.next(total);
    }
  }

}

export const formatNzRows = (rows: UiTable2Row[], columns: UiTable2Column[]): NzUiTable2Row[] => {
  return rows.map((row, index) => {
    const orderedRows: NzUiCell[] = [];
    columns.forEach((column) => {

      const cell: NzUiCell = { ...row.cells[column.key], key: column.key }

      if (cell.label?.icon) {
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
