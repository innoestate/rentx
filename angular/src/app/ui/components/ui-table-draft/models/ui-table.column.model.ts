import { NzTableFilterFn } from "ng-zorro-antd/table";
import { UiNestedDropdown } from "../../ui-nested-dropdown/model/ui-nested-dropdown.model";
import { CellType } from "../types/ui-table.cell.type";
import { UiTableRow } from "./ui-table-row.model";

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
  dropdown?: UiNestedDropdown,
  dropDownCellsUniqueItem?: CellType,
  headDropdown?: UiNestedDropdown
}
