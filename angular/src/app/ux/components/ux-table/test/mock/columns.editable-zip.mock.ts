import { CELL_TYPE_ENUM } from "../../enums/ux-table.cell.enum";
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
    type: CELL_TYPE_ENUM.EDITABLE_NUMBER
  }
]
