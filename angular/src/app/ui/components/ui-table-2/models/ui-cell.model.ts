import { UiNestedDropdownActions } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "../components/ui-label/models/ui-label.model";
import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";

export interface UiCell {
  type: 'icon' | 'string' | 'number' | 'dropdown-actions';

  label: UiLabel2;

  color?: string;
  title?: UiTitle;
  icon?: UiIcon;
  command?: (value?: any) => void;

  editable?: boolean;
  dropdown?: UiNestedDropdownActions;
}