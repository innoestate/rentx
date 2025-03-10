import { UiTableRow } from "./ui-table-row.model";
import { UiTableColumnItem } from "./ui-table.column.model";

export interface UiTable {
  columns: UiTableColumnItem[];
  rows: UiTableRow[];
}
