import { UiLabel, UiLabelMatrix } from "../../ui-label/models/ui-label.model";

export interface UiNestedDropdown {
  labelMatrix?: UiLabelMatrix;
  label: UiLabel;
  list?: UiNestedDropdown[];
}
