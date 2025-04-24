import { UiNestedDropdown2 } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "../../ui-label/models/ui-label.model";


export type ColumnCellType = 'icon' |
  'dropdown-actions-icon' |
  'string' | 'fullSizeString' |
  'longString' |
  'mediumString' |
  'smallString' |
  'number' |
  'longNumber' |
  'dropdown-actions' |
  'dropdown-select';

export interface UiColumnCell {
  type: ColumnCellType;
  label?: UiLabel2;
  editable?: boolean;
  dropdown?: UiNestedDropdown2;
  sort?: {
    priority: number;
    function?: (a: any, b: any) => number;
  }

}
