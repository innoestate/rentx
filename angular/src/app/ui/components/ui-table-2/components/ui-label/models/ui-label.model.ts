import { UiIcon } from "../../../../ui-icon/models/ui-icon.model";
import { UiTitle } from "../../../models/ui-title.model";

export interface UiLabel2 {
  color?: string;
  title?: UiTitle;
  icon?: UiIcon;
  command?: (value?: any) => void;
}
