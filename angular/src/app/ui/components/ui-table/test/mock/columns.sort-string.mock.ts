import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithSortStringOnNameMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    sort: 1,
    editable: true
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
    type: 'text',
  }
]

export const NAME_COLUMN_INDEX = 2;
