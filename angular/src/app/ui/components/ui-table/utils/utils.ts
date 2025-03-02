import { NzUiColumnConfig } from "../models/nz-ui-column.config.model";
import { UiTableColumnItem } from "../models/ui-table.column.model";
import { CellType } from "../types/ui-table.cell.type";

export const sortString = (listA: string[], listB: string[], index: number): number=> {
  return (listA[index].toString().localeCompare(listB[index].toString()));
};

export const formatNzColumnConfig = <T>(column: UiTableColumnItem, columnIndex: number): NzUiColumnConfig => {
  const columnConfig = { ...column } as NzUiColumnConfig;
  if (column.sort !== undefined) {
    columnConfig.sort = {
      priority: column.sort,
      fn: (a: any, b: any) => sortString(a, b, columnIndex)
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
