import { UiNestedDropdownActions } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";

export interface UiCell {
  type: 'icon' | 'string' | 'number' | 'dropdown-actions';
  color?: string;
  title?: UiTitle;
  icon?: UiIcon;
  editable?: boolean;
  dropdown?: UiNestedDropdownActions;
  command?: (value?: any) => void;
}