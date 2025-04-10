import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, input, model, output, signal, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject, from, Subject, take, tap } from 'rxjs';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiNestedDropdownComponent } from "../ui-nested-dropdown/ui-nested-dropdown.component";
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';
import { NzUiColumnConfig } from './models/nz-ui-column.config.model';
import { NzUiTableRow } from './models/nz-ui-table-row.model';
import { UiTableRow } from './models/ui-table-row.model';
import { UiTableColumnItem } from './models/ui-table.column.model';
import { UiTable } from './models/ui-table.model';
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
    NzUxCellEditableStringComponent,
    NzUxCellEditableNumberComponent,
    NzUiCellNestedDropdownComponent,
    NzUxCellItemComponent,
    UiNestedDropdownComponent,
    UiIconComponent,
    UiPaginationComponent],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent implements AfterViewInit {

  @ViewChild('table') table!: NzTableComponent<UiTable>;
  @ViewChild('background') background!: ElementRef;
  ROW_HEIGHT = 44;
  rows = input.required<UiTableRow[]>();
  columns = input.required<UiTableColumnItem[]>();
  title = input<string>();
  commands = input<{ label: string, icon: string, command: () => void }[]>();
  editRow = output<UiTableRow>();
  fixedColumns = input<{ left: number, right: number }>({ left: 0, right: 1000 });
  displayedTotal$ = new BehaviorSubject<number>(0);
  displayedTotal = toSignal(this.displayedTotal$);
  backgroundImagePath = input<string>();

  protected nzRows: Signal<NzUiTableRow[]> = this.buildNzRows();
  protected nzColumns: Signal<NzUiColumnConfig[]> = this.buildNzColumns();
  protected editId: string | null = null;
  protected rowsPerPages = signal(1);
  protected pages = computed(() => {
    const rowsPerPage = this.rowsPerPages();
    if (!this.displayedTotal()) return Math.ceil(this.nzRows().length / rowsPerPage);
    return Math.ceil(this.displayedTotal()! / rowsPerPage);
  })
  protected pageIndex = model<number>(1);
  protected cellHover = signal<{ nzRow: NzUiTableRow, columnIndex: number} | null>(null);
  protected rowHover = signal<NzUiTableRow | null>(null);

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.classList.add('ui-table-header');
  }

  handleCurrentPageDataChange(changes: any): void {
    if (this.table?.nzTotal !== undefined) {
      const total = this.table.nzTotal;
      this.displayedTotal$.next(total);
    }
  }

  handleFilterChange() {
    this.pageIndex.set(1);
  }

  ngAfterViewInit(): void {
    this.iniSizing();
  }

  private iniSizing() {
    from(this.htmlRowsAreLoaded()).pipe(
      take(1),
      tap(() => {
        const heights = this.getHeights();
        this.calculateRowsPerPages(heights);
        this.drawBackground(heights);
      })).subscribe();
  }

  private getHeights() {

    const rows = this.elRef.nativeElement.querySelectorAll('.ant-table-row');

    const table = this.elRef.nativeElement.querySelector('.ant-table')?.getBoundingClientRect().height || 0;
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

  private drawBackground(heights: { table: number, head: number, row: number, footer: number }) {
    const background = this.background.nativeElement;
    background.style.top = `${heights.head}px`;
    background.style.height = `${heights.table - heights.head - heights.footer}px`;
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

  private hasRowsAfterHeader() {
    let rows = document.querySelectorAll('.ant-table-row');
    if (rows.length > 1) {
      return true;
    }
    return false;
  }

  clickOnRow() {

  }

  startEdit(columnIndex: number, rowIndex: number) {
    this.editId = (columnIndex + this.columns()[rowIndex].key);
  }

  edit(value: any, nzRow: NzUiTableRow, columnIndex: number) {
    const row = this.getUiRow(nzRow);
    const key = this.getColumnKey(columnIndex);
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

  cellMouseEnter(nzRow: NzUiTableRow, columnIndex: number) {
    this.cellHover.set({ nzRow, columnIndex });
    this.rowMouseEnter(nzRow);
  }

  cellMouseLeave(nzRow: NzUiTableRow) {
    this.cellHover.set(null);
    this.rowMouseEnter(nzRow);
  }

  rowMouseEnter(nzRow: NzUiTableRow) {
    if(this.cellHover() === null){
      this.rowHover.set(nzRow);
    }else{
      this.rowHover.set(null);
    }
  }

  rowMouseLeave() {
    this.rowHover.set(null);
  }

  private getUiRow(nzRow: NzUiTableRow): UiTableRow{
    return this.rows()[nzRow.inputRowIndex];
  }

  private getColumnKey(columnIndex: number) {
    return this.columns()[columnIndex].key;
  }

  private buildNzColumns(): Signal<NzUiColumnConfig[]> {
    return computed(() => this.columns().map((column, columnIndex) => formatNzColumnConfig(column, columnIndex)))
  }

  private buildNzRows(): Signal<NzUiTableRow[]> {
    return computed(() => formatNzRows(this.rows(), this.columns()));
  }
}
