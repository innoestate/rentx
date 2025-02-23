import { CELL_TYPE } from "../../models/ux-table.cell-types";

export const columnsWithEditableNameMock = [
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
  }
]
