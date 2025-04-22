import { UiNestedDropdown2 } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "../components/ui-label/models/ui-label.model";

/**
 * The cell definition.
 * WARNING: If `dropdown` is used, `label` must not be used, because the info that will be used as label will be provided by `dropdown.label`.
 */

export interface UiCell {
  type: 'icon' | 'string' | 'number' | 'dropdown-actions' | 'dropdown-select' | 'dropdown-actions-icon';
  label?: UiLabel2;//do not use if `dropdown` is used
  editable?: boolean;
  dropdown?: UiNestedDropdown2;
}
