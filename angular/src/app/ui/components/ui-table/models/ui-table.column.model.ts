import { UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";

type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UiTableColumnItem {
  key: string,
  label: string,
  editable?: boolean,
  sort?: Priority,
  dropDownItems?: UiDropdownItem<any>[]
}
