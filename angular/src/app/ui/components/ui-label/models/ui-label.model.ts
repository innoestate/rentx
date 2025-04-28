import { UiIcon } from "../../ui-icon/models/ui-icon.model";
import { UiTitle } from "../../ui-table/models/ui-title.model";

export interface UiLabel {
  color?: string;
  title?: UiTitle;
  icon?: UiIcon;
  command?: (value?: any) => void;
}


export interface UiLabelMatrix {
  color?: boolean;
  title?: boolean;
  icon?: boolean;
}
