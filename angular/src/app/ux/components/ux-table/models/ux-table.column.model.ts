import { UxDropdownItem } from "../../ux-dropdown/model/ux-dropdown-item.model";
import { CELL_TYPE_ENUM } from "../enums/ux-table.cell.enum";

type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UxTableColumnItem {
  key: string,
  label: string,
  type?: CELL_TYPE_ENUM,
  editable?: boolean,
  sort?: Priority,
  dropDownItems?: UxDropdownItem<any>[]
}
