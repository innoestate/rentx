import { CELL_TYPE } from "./ux-table.cell-types";

export interface UxTableColumnItem {
  key: string,
  label: string,
  type?: CELL_TYPE
}
