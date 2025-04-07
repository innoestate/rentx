import { NzTableFilterFn, NzTableFilterList, NzTableSortFn } from "ng-zorro-antd/table";
import { UiNestedDropdown } from "../../ui-nested-dropdown/model/ui-nested-dropdown.model";
import { CellType } from "../types/ui-table.cell.type";

export interface NzUiColumnConfig {
  key: string;
  label: string;
  width: string;
  editable?: boolean;
  dropdown?: UiNestedDropdown;
  dropDownCellsUniqueItem?: CellType;
  headDropdown?: UiNestedDropdown;
  type?: string;
  icon?: string;
  command?: () => void;
  sort?: {
    fn: NzTableSortFn;
    priority: number;
  }
  filter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
}
