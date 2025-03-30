import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithEditableZipMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'text',
  },
  {
    key: 'zip',
    label: 'Zip',
    editable: true,
    type: 'text',
  }
]
