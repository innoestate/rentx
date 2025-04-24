import { CellType } from "../types/ui-table.cell.type";

export interface NzUiTableRow {
  inputRowIndex: number,
  data: any,
  cells: CellType[]
}
