import { UiTableRow } from "../models/ui-table-row.model";
import { UiTableColumnItem } from "../models/ui-table.column.model";
import { UiTable } from "../models/ui-table.model";

export abstract class UiTableAdapter {
  abstract buildTable(...args: any): UiTable;
  abstract getDtoFromRow(row: UiTableRow): any;
  protected abstract createColumns(...args: any): UiTableColumnItem[];
  protected abstract createRows(...args: any): UiTableRow[];
}