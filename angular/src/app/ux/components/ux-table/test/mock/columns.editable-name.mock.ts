import { CELL_TYPE } from "../../models/ux-table.cell-types";
import { UxTableColumnItem } from "../../models/ux-table.column.model";

export const columnsWithEditableNameMock: UxTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name',
    type: CELL_TYPE.CELL_TYPE_EDITABLE_STRING
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'phone',
    label: 'Phone'
  },
  {
    key: 'zip',
    label: 'Zip',
  }
]
