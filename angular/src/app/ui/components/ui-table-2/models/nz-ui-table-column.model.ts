import { UiColumnCell } from "./ui-column-cell.model";

export interface NzUiTable2Column {
  cell: UiColumnCell;
  width?: string;
  sort?: {
    priority: number;
    function?: (a: any, b: any) => number;
  }
}
