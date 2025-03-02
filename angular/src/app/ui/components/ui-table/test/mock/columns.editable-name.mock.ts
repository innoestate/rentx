import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithEditableNameMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name',
    editable: true,
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
