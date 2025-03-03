import { CellType } from "../types/ui-table.cell.type";

export interface UiTableRow {
  data: any,
  cells: { [key: string]: CellType }
}
