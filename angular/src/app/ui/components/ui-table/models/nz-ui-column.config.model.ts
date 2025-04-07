import { NzTableFilterFn, NzTableFilterList, NzTableSortFn } from "ng-zorro-antd/table";
import { UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";
import { CellType } from "../types/ui-table.cell.type";
import { UiNestedDropdown } from "../../ui-nested-dropdown/model/ui-nested-dropdown.model";

export interface NzUiColumnConfig {
  key: string;
  label: string;
  width: string;
  editable?: boolean;
  dropDownItems?: UiDropdownItem<any>[];
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
