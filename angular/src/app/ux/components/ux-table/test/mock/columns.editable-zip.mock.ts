import { CELL_TYPE } from "../../models/ux-table.cell-types";
import { UxTableColumnItem } from "../../models/ux-table.column.model";

export const columnsWithEditableZipMock: UxTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name',
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
    type: CELL_TYPE.CELL_TYPE_EDITABLE_NUMBER
  }
]
