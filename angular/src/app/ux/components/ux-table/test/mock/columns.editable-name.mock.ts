import { CELL_TYPE_ENUM } from "../../enums/ux-table.cell.enum";
import { UxTableColumnItem } from "../../models/ux-table.column.model";

export const columnsWithEditableNameMock: UxTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name',
    type: CELL_TYPE_ENUM.EDITABLE_STRING
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
