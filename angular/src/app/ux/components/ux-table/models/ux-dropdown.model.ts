import { UxDropdownItem } from "../../ux-dropdown/model/ux-dropdown-item.model";

export interface UxDropDown<T> {
  value: string;
  list: UxDropdownItem<T>[];
}
