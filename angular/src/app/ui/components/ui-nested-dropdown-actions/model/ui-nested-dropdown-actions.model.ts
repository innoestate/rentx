import { UiLabel2 } from "../../ui-label/models/ui-label.model";

export interface UiNestedDropdown2 {
  label: UiLabel2;
  list?: UiNestedDropdown2[];
}
