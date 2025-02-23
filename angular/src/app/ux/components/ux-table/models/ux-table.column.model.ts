import { CELL_TYPE } from "./ux-table.cell-types";

type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UxTableColumnItem {
  key: string,
  label: string,
  type?: CELL_TYPE,
  sort?: Priority
}
