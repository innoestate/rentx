import { UiDropdownItem } from "./ui-dropdown-item.model";

export interface UiDropdown<T> {
  value: string;
  list: UiDropdownItem<T>[];
}
