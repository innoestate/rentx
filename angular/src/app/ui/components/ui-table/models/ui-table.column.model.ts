import { NzTableFilterFn } from "ng-zorro-antd/table";
import { UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "./ui-table-row.model";
import { CellType } from "../types/ui-table.cell.type";

export type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UiTableColumnItem {
  key: string,
  label: string,
  type: 'text' | 'number' | 'dropdown',
  editable?: boolean,
  sort?: Priority,
  icon?: string,
  filter?: {text: string, value: string}[],
  filterFn?: NzTableFilterFn<UiTableRow>,
  dropDownItems?: UiDropdownItem<any>[],
  dropDownCellsUniqueItem?: CellType,
}
