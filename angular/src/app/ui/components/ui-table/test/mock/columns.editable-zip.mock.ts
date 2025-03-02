import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithEditableZipMock: UiTableColumnItem[] = [
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
    editable: true
  }
]
