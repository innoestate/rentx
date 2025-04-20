import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";


export type ColumnCellType = 'icon' |
  'string' | 'fullSizeString' |
  'longString' |
  'mediumString' |
  'smallString' |
  'number' |
  'longNumber' |
  'dropdown';

export interface UiColumnCell {
  type: ColumnCellType;
  title?: UiTitle;
  icon?: UiIcon;
  color?: string;
  editable?: boolean;
}