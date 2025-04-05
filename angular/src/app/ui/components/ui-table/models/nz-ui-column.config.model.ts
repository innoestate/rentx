import { NzTableFilterFn, NzTableFilterList, NzTableSortFn } from "ng-zorro-antd/table";
import { UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";
import { CellType } from "../types/ui-table.cell.type";

export interface NzUiColumnConfig {
  key: string;
  label: string;
  editable?: boolean;
  dropDownItems?: UiDropdownItem<any>[];
  dropDownCellsUniqueItem?: CellType;
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
