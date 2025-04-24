import { UiNestedDropdown2 } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "../components/ui-label/models/ui-label.model";
import { UiCell } from "./ui-cell.model";

export interface NzUiCell extends UiCell {
  key: string;
  internal?: boolean;
  label?: UiLabel2;
  dropdown?: UiNestedDropdown2;
}
