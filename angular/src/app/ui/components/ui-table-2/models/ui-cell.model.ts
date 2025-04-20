import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";

export interface UiCell {
  title?: UiTitle;
  icon?: UiIcon;
  color?: string;
  editable?: boolean;
}