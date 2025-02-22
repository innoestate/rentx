import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, Signal } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UxTableColumnItem } from './models/ux-table.model';
import { CELL_TYPE as CELL_TYPE_ENUM } from './models/ux-table.cell-types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Row {
  [key: string]: any;
}

@Component({
  selector: 'ux-table',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzTableModule],
  templateUrl: './ux-table.component.html',
  styleUrl: './ux-table.component.scss'
})
export class UxTableComponent<T extends Row> {

  CELL_TYPE = CELL_TYPE_ENUM;
  rows = input.required<T[]>();
  columns = input.required<UxTableColumnItem[]>();
  editRow = output<T>();

  nzRows: Signal<string[][]> = this.buildNzRows();
  editId: string | null = null;
  editingDiv: any;

  constructor() {
    effect(() => {
      this.nzRows = this.buildNzRows();
    })
  }

  startEdit(event: Event, id: string): void {
    this.editId = id;
    this.editingDiv = event.target;
  }

  edit(event: Event, nzRowIndex: number, keyIndex: number): void {
    const row = this.rows()[nzRowIndex] as Row;
    const key = this.columns()[keyIndex].key;
    const newRow = { ...row, [key]: (event.target as HTMLInputElement).value } as T;
    this.editingDiv.innerHTML = (event.target as HTMLInputElement).value;
    this.editRow.emit(newRow);
  }

  stopEdit(): void {
    this.editId = null;
    this.editingDiv = null;
  }

  private buildNzRows(): Signal<string[][]> {
    return computed(() => {
      return this.rows().map(row => {
        const alignedRows: string[] = [];
        this.columns().forEach( (column) => {
          alignedRows.push(row[column.key])
        });
        return alignedRows;
      });
    });
  }

}
