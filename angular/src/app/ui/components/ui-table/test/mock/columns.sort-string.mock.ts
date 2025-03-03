import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithSortStringOnNameMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
    sort: 1,
    editable: true
  },
  {
    key: 'email',
    label: 'Email',
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

export const NAME_COLUMN_INDEX = 2;
