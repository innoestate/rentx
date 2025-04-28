import { UiNestedDropdown } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel } from "../../ui-label/models/ui-label.model";
import { NzTableFilterFn, NzTableFilterList } from "ng-zorro-antd/table";
import { UiTableRow } from "./ui-table-row.model";
import { NzUiTableRow } from "./nz-ui-table-row.model";


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
  label?: UiLabel;
  editable?: boolean;
  dropdown?: UiNestedDropdown;
  sort?: {
    priority: number;
    function?: (a: any, b: any) => number;
  },
  filter?: {
    list: NzTableFilterList;
    function?: NzTableFilterFn<NzUiTableRow>
  }

}
