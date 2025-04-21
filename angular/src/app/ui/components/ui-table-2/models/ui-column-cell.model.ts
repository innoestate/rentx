import { UiNestedDropdownActions } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "../components/ui-label/models/ui-label.model";


export type ColumnCellType = 'icon' |
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
  dropdown?: UiNestedDropdownActions;

}