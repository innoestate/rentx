import { UiLabel2 } from "../../ui-table-2/components/ui-label/models/ui-label.model";

export interface UiNestedDropdown2 {
  label: UiLabel2;
  list?: UiNestedDropdown2[];
}
