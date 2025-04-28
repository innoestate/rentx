import { UiNestedDropdown } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel } from "../../ui-label/models/ui-label.model";
import { NzTableFilterFn, NzTableFilterList } from "ng-zorro-antd/table";
import { UiTable2Row } from "./ui-table-row.model";
import { NzUiTable2Row } from "./nz-ui-table-row.model";


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
    function?: NzTableFilterFn<NzUiTable2Row>
  }

}
