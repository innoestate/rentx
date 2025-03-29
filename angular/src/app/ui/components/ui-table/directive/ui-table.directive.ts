import { Signal } from "@angular/core";
import { UiTableRow } from "../models/ui-table-row.model";
import { UiTable } from "../models/ui-table.model";

export abstract class UiTableDirective {
  protected abstract buildTable(): Signal<UiTable>;
  protected abstract bindCommands(table: UiTable): UiTable;
  protected abstract updateRow(row: UiTableRow): void;
  protected verifyRowId(row: UiTableRow): void {
    if (!row.data['id']) throw new Error('Need an id in row data.');
  };
}