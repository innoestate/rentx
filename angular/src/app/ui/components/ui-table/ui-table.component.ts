import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, input, output, signal, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { from, take, tap } from 'rxjs';
import { NzUiColumnConfig } from './models/nz-ui-column.config.model';
import { NzUiTableRow } from './models/nz-ui-table-row.model';
import { UiTableRow } from './models/ui-table-row.model';
import { UiTableColumnItem } from './models/ui-table.column.model';
import { NzUiCellNestedDropdownComponent } from './nz-ui-cell-editable/nested-dropdown/nz-ui-cell-nested-dropdown.component';
import { NzUxCellEditableNumberComponent } from './nz-ui-cell-editable/number/nz-ui-cell-editable-number.component';
import { NzUxCellEditableStringComponent } from './nz-ui-cell-editable/string/nz-ui-cell-editable-string.component';
import { NzUxCellItemComponent } from './nz-ui-cell-item/nz-ui-cell-item.component';
import { formatNzColumnConfig, formatNzRows } from './utils/utils';
import { UiNestedDropdownComponent } from "../ui-nested-dropdown/ui-nested-dropdown.component";

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
    NzUxCellItemComponent, UiNestedDropdownComponent],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent implements AfterViewInit {

  ROW_HEIGHT = 44;

  rows = input.required<UiTableRow[]>();
  columns = input.required<UiTableColumnItem[]>();
  title = input<string>();
  commands = input<{label: string, icon: string, command: () => void}[]>();
  editRow = output<UiTableRow>();
  fixedColumns = input<{left: number, right: number}>({
    left: 0,
    right: 1000
  });

  protected nzRows: Signal<NzUiTableRow[]> = this.buildNzRows();
  protected nzColumns: Signal<NzUiColumnConfig[]> = this.buildNzColumns();
  protected editId: string | null = null;
  protected rowsPerPages = signal(1);

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.classList.add('ui-table-header');
  }

  ngAfterViewInit(): void {
    this.calculateRowsPerPages();
  }

  private calculateRowsPerPages() {
    from(this.htmlRowsAreLoaded()).pipe(
      take(1),
      tap(() => {
        const table = this.elRef.nativeElement.querySelector('.ant-table') as HTMLDivElement;
        const tableThead = this.elRef.nativeElement.querySelector('.ant-table-thead') as HTMLDivElement;
        const tableRow = this.elRef.nativeElement.querySelectorAll('.ant-table-row')[1] as HTMLDivElement;
        const paginationHeight = 47;
        const bodyHeight = table.getBoundingClientRect().height
                          - tableThead.getBoundingClientRect().height
                          - paginationHeight - 10;
        const rowsPerPages = Math.floor(bodyHeight / tableRow.getBoundingClientRect().height);
        this.rowsPerPages.set(rowsPerPages);
    })).subscribe();
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
