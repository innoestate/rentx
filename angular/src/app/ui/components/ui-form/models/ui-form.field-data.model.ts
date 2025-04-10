import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";

export interface UiFormFieldData {
  key: string;
  label: string;
  type: 'text' | 'text-area' | 'number' | 'dropdown' | 'signature';
  required?: boolean,
  dropdownItems?: UiDropdownItem<any>[]
}
