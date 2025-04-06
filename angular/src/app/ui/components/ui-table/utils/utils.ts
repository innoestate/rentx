import { isUiDropdownItem, UiDropdownItem } from "../../ui-dropdown/model/ui-dropdown-item.model";
import { NzUiColumnConfig } from "../models/nz-ui-column.config.model";
import { NzUiTableRow } from "../models/nz-ui-table-row.model";
import { UiTableRow } from "../models/ui-table-row.model";
import { UiTableColumnItem } from "../models/ui-table.column.model";
import { CellType } from "../types/ui-table.cell.type";

export const formatNzColumnConfig = <T>(column: UiTableColumnItem, columnIndex: number): NzUiColumnConfig => {
  const columnConfig = { ...column } as NzUiColumnConfig;
  columnConfig.width = column.type === 'number' ? '70px' : '100px';
  if (column.sort !== undefined) {
    columnConfig.sort = {
      priority: column.sort,
      fn: (a: any, b: any) => sortRows(a, b, columnIndex)
    }
  }
  return columnConfig;
}

export const formatNzRows = (rows: UiTableRow[], columns: UiTableColumnItem[]): NzUiTableRow[] => {
  return rows.map((row, index) => {
    const orderedRows: CellType[] = [];
    columns.forEach((column) => {
      orderedRows.push(row.cells[column.key] as CellType);
    });
    return { inputRowIndex: index, data: row.data, cells: orderedRows };
  });
}

const sortDropdown = (rowA: CellType[], rowB: CellType[], index: number): number=> {
  const dropdownA = rowA[index] as UiDropdownItem<any>;
  const dropdownB = rowB[index] as UiDropdownItem<any>;
  if(!dropdownA?.label || !dropdownB?.label) return 0;
  return (dropdownA?.label.localeCompare(dropdownB?.label));
}

const sortRows = (rowA: NzUiTableRow, rowB: NzUiTableRow, columnIndex: number): number=> {
  const cellA = rowA.cells[columnIndex];
  const cellB = rowB.cells[columnIndex];
  if(isDropDownCell(cellA, cellB)) return sortDropdown(rowA.cells, rowB.cells, columnIndex);
  return sortString(rowA.cells, rowB.cells, columnIndex)
}

const sortString = (rowA: CellType[], rowB: CellType[], index: number): number=> {
  return (rowA[index].toString().localeCompare(rowB[index].toString()));
};

const isDropDownCell = (cellA: CellType, cellB: CellType ): boolean => {
  return isUiDropdownItem(cellA) && isUiDropdownItem(cellB);
}
