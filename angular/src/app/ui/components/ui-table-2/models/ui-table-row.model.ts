import { UiCell } from "./ui-cell.model";

export interface UiTable2Row {
  data: any,
  cells: { [key: string]: UiCell }
}
