import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, input, model, output, signal, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';
import { UiDynamicCellComponent } from "./components/ui-dynamic-cell/ui-dynamic-cell.component";
import { NzUiCell } from './models/nz-ui-cell.model';
import { NzUiTable2Column } from './models/nz-ui-table-column.model';
import { NzUiTableRow } from './models/nz-ui-table-row.model';
import { UiCell } from './models/ui-cell.model';
import { UiTableRow } from './models/ui-table-row.model';
import { UiTable } from './models/ui-table.model';
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

  @ViewChild('tableRef') tableRef!: NzTableComponent<UiTableRow>;
  table = input.required<UiTable>();
  editCell = output<{ id: string, key: string, cell: UiCell }>();
  rowsPerPages = toSignal(getSizing(this.elRef));
  selectedNzRow = signal<NzUiTableRow | null>(null);
  onSelect = model<UiTableRow>();

  protected nzRows: Signal<NzUiTableRow[]> = this.buildNzRows();
  protected nzColumns: Signal<NzUiTable2Column[]> = this.buildNzColumns();
  protected pageIndex = model<number>(1);
  protected pagesNumber = computed(() => this.pagination.getPageNumber(this.nzRows().length, this.rowsPerPages() ?? 1))

  constructor(private elRef: ElementRef, protected pagination: Pagination) {
    this.initSelectRowOutEffect();
    this.initSelectRowInEffect();
  }

  edit(cell: NzUiCell, nzRow: NzUiTableRow, columnIndex: number) {
    const key = nzRow.cells[columnIndex].key as string;
    if (!key) throw new Error('Key not found');
    this.editCell.emit({ id: nzRow.id, key, cell })
  }

  protected select(nzRow: NzUiTableRow){
    const selectedRow = this.table().rows().find(r => r.data.id === nzRow.id);
    if(selectedRow){
      this.selectedNzRow.set(nzRow);
      this.onSelect.set(selectedRow);
    }
  }

  private buildNzColumns(): Signal<NzUiTable2Column[]> {
    return computed(() => this.table().columns().map((column, index) => formatColumn(column, index)));
  }

  private buildNzRows(): Signal<NzUiTableRow[]> {
    return computed(() => formatNzRows(this.table().rows(), this.table().columns()));
  }

  private initSelectRowInEffect(){
    effect(() => {
      const selected = this.onSelect();
      if(selected){
        const selectedRow = this.nzRows().find(r => r.id === selected.data.id);
        this.selectedNzRow.set(selectedRow || null);
      }
    })
  }

  private initSelectRowOutEffect(){
    effect(() => {
      if(this.table().rows().length > 0 && this.selectedNzRow()){
        this.select(this.selectedNzRow()!);
      }
    })
  }

  handleCurrentPageDataChange(): void {
    this.pagination.setTotal();
  }

}
