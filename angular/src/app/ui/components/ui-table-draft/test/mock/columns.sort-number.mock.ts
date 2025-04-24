import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithSortNumberOnNameMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'text'
  },
  {
    key: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text'
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'text'
  },
  {
    key: 'zip',
    label: 'Zip',
    type: 'text',
    sort: 1
  }
]

export const ZIP_COLUMN_INDEX = 5;
