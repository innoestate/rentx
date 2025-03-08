import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";

export interface FormPopupFieldData {
  key: string;
  label: string;
  type: 'text' | 'number' | 'dropdown' | 'signature';
  required: boolean,
  dropdownItems?: UiDropdownItem<any>[]
}
