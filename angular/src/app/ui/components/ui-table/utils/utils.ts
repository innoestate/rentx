import { isUiDropdownItem, UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";
import { NzUiColumnConfig } from "../models/nz-ui-column.config.model";
import { UiTableColumnItem } from "../models/ui-table.column.model";
import { CellType } from "../types/ui-table.cell.type";

export const formatNzColumnConfig = <T>(column: UiTableColumnItem, columnIndex: number): NzUiColumnConfig => {
  const columnConfig = { ...column } as NzUiColumnConfig;
  if (column.sort !== undefined) {
    columnConfig.sort = {
      priority: column.sort,
      fn: (a: any, b: any) => sortRows(a, b, columnIndex)
    }
  }
  return columnConfig;
}

export const formatNzRows = (rows: any[], columns: UiTableColumnItem[]): CellType[][] => {
  return rows.map(row => {
    const orderedRows: CellType[] = [];
    columns.forEach((column) => {
      orderedRows.push(row[column.key] as CellType);
    });
    return orderedRows;
  });
}

const sortDropdown = (rowA: CellType[], rowB: CellType[], index: number): number=> {
  const dropdownA = rowA[index] as UiDropdownItem<any>;
  const dropdownB = rowB[index] as UiDropdownItem<any>;
  if(!dropdownA?.label || !dropdownB?.label) return 0;
  return (dropdownA?.label.localeCompare(dropdownB?.label));
}

const sortRows = (rowA: CellType[], rowB: CellType[], columnIndex: number): number=> {
  const cellA = rowA[columnIndex];
  const cellB = rowB[columnIndex];
  if(isDropDownCell(cellA, cellB)) return sortDropdown(rowA, rowB, columnIndex);
  return sortString(rowA, rowB, columnIndex)
}

const sortString = (rowA: CellType[], rowB: CellType[], index: number): number=> {
  return (rowA[index].toString().localeCompare(rowB[index].toString()));
};

const isDropDownCell = (cellA: CellType, cellB: CellType ): boolean => {
  return isUiDropdownItem(cellA) && isUiDropdownItem(cellB);
}
