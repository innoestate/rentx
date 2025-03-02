import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithSortNumberOnNameMock: UiTableColumnItem[] = [
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
    sort: 1
  }
]

export const ZIP_COLUMN_INDEX = 5;
