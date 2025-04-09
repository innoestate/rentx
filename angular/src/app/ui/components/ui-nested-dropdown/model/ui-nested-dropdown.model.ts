import { UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";

export interface UiNestedDropdown {
  fixedHead?: {
    label: string;
    icon: string;
    iconSize?: number;
    value: any;
    dropdown?: UiDropdownItem<any>[];
    command?: () => void;
    color?: string;
  }
  list: UiDropdownItem<any>[];
}