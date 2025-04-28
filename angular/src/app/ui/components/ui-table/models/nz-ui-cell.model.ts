import { UiNestedDropdown } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel } from "../../ui-label/models/ui-label.model";
import { UiCell } from "./ui-cell.model";

export interface NzUiCell extends UiCell {
  key: string;
  internal?: boolean;
  label?: UiLabel;
  dropdown?: UiNestedDropdown;
}
