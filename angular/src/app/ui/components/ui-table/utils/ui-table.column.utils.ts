import { NzUiTable2Column } from "../models/nz-ui-table-column.model";
import { UiTable2Column } from "../models/ui-table.column.model";
import { getSort } from "./ui-table.sort.column.utils";


export const formatColumn = (column: UiTable2Column, columnIndex: number): NzUiTable2Column => {
  return {
    cell: {
      ...column.cell,
      sort: getSort(column, columnIndex),
      label: {
        ...column.cell.label,
        icon: getIcon(column),
        title: column.cell?.label?.title ? { ...column.cell.label!.title, weight: 'bold' } : undefined
      }
    },
    width: getWidth(column)
  };
}

const getIcon = (column: UiTable2Column) => {
  let icon = column.cell?.label?.icon;
  if (icon) {
    icon = {
      size: 24,
      color: 'var(--color-secondary-500)',
      ...icon,
    };
  }
  return icon;
}

const getWidth = (column: UiTable2Column) => {

  let width = undefined;
  if (column.cell.type === 'mediumString') {
    width = '150px';
  } else if (column.cell.type === 'smallString') {
    width = '100px';
  } else if (column.cell?.type === 'longString') {
    width = '300px';
  } else if (column.cell?.type === 'fullSizeString') {
    width = '100%';
  } else if (column.cell?.type === 'number') {
    width = '60px';
  } else if (column.cell?.type === 'longNumber') {
    width = '110px';
  } else if (column.cell?.type === 'icon') {
    width = '60px';
  } else if (column.cell?.type === 'dropdown-actions-icon') {
    width = '60px';
  }

  return width;
}

