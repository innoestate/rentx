import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";


export interface UiColumnCell  {
  type: 'icon' | 'string' | 'fullSizeString' | 'longString' | 'mediumString' | 'smallString' ;
  title?: UiTitle;
  icon?: UiIcon;
  color?: string;
  editable?: boolean;
}