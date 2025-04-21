import { UiNestedDropdown2 } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "../components/ui-label/models/ui-label.model";

export interface UiCell {
  type: 'icon' | 'string' | 'number' | 'dropdown-actions' | 'dropdown-select' | 'dropdown-actions-icon';
  label?: UiLabel2;
  editable?: boolean;
  dropdown?: UiNestedDropdown2;
}
