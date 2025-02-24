import { NzTableSortFn } from "ng-zorro-antd/table";
import { UxDropdownItem } from "../../ux-dropdown/model/ux-dropdown-item.model";

export interface NzUxColumnConfig {
  key: string;
  label: string;
  editable?: boolean;
  dropDownItems?: UxDropdownItem<any>[];
  type?: string;
  sort?: {
    fn: NzTableSortFn;
    priority: number;
  }
}
