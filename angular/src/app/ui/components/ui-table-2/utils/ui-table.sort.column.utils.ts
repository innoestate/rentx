import { UiNestedDropdown2 } from "../../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { NzUiTable2Row } from "../models/nz-ui-table-row.model";
import { UiCell } from "../models/ui-cell.model";
import { UiTable2Column } from "../models/ui-table.column.model";

export const getSort = (column: UiTable2Column, columnIndex: number) => {
  if (column.cell.sort !== undefined) {
    return {
      priority: column.cell.sort.priority,
      function: (a: any, b: any) => sortRows(a, b, columnIndex)
    }
  }
  return undefined;
}

const sortRows = (rowA: NzUiTable2Row, rowB: NzUiTable2Row, columnIndex: number): number => {
  const cellA = rowA.cells[columnIndex];
  const cellB = rowB.cells[columnIndex];
  if (isDropDownCell(cellA, cellB)) return sortDropdown(rowA.cells, rowB.cells, columnIndex);
  return sortString(rowA.cells, rowB.cells, columnIndex)
}

const sortString = (rowA: UiCell[], rowB: UiCell[], index: number): number => {
  if (!rowA[index].label?.title?.label || !rowB[index].label?.title?.label) return 0;
  return (rowA[index].label!.title!.label!.toString().localeCompare(rowB[index].label!.title!.label!.toString()));
};

const isDropDownCell = (cellA: UiCell, cellB: UiCell): boolean => {
  return !!cellA.dropdown && !!cellB.dropdown;
}

const sortDropdown = (rowA: UiCell[], rowB: UiCell[], index: number): number => {
  const dropdownA = rowA[index] as UiNestedDropdown2;
  const dropdownB = rowB[index] as UiNestedDropdown2;
  if (!dropdownA?.list || !dropdownB?.list) return 0;
  return ((dropdownA?.list[0]?.label?.title?.label! + '').localeCompare(dropdownB?.list[0]?.label?.title?.label! + ''));
}
