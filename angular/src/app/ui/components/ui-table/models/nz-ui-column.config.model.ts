import { NzTableFilterFn, NzTableFilterList, NzTableSortFn } from "ng-zorro-antd/table";
import { UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";

export interface NzUiColumnConfig {
  key: string;
  label: string;
  editable?: boolean;
  dropDownItems?: UiDropdownItem<any>[];
  type?: string;
  sort?: {
    fn: NzTableSortFn;
    priority: number;
  }
  filter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
}
