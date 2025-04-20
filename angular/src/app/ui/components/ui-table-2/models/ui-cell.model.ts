import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";

export interface UiCell {
  type: 'icon' | 'string' ;
  title?: UiTitle;
  icon?: UiIcon;
  color?: string;
  editable?: boolean;
}