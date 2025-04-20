import { UiLabel } from "../../ui-table-2/components/ui-label/models/ui-label.model";

export interface UiNestedDropdownActions {
  label: UiLabel;
  list?: UiNestedDropdownActions[];
}