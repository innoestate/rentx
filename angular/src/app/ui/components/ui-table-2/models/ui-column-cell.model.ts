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
  editable?: boolean;
}