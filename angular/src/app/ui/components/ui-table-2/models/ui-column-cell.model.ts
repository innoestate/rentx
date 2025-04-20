import { UiIcon } from "./ui-icon.model";
import { UiTitle } from "./ui-title.model";
import { UiLabel2 } from "../components/ui-label/models/ui-label.model";

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
  label?: UiLabel2;
  title?: UiTitle;
  icon?: UiIcon;
  color?: string;
  editable?: boolean;
}