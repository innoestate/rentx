import { NzUxColumnConfig } from "../models/nz-ux-column.config.model";
import { UxTableRow } from "../models/ux-table-row.model";
import { CELL_TYPE_ENUM } from "../enums/ux-table.cell.enum";
import { UxTableColumnItem } from "../models/ux-table.column.model";
import { CellType } from "../types/ux-table.cell.type";
// import { NzCellType } from "../ux-table.component";

export const sortString = (listA: string[], listB: string[], index: number): number=> {
  return (listA[index].localeCompare(listB[index]));
};

export const formatNzColumnConfig = <T>(column: UxTableColumnItem, columnIndex: number): NzUxColumnConfig => {
  const columnConfig = { ...column } as NzUxColumnConfig;
  if (column.sort !== undefined) {
    columnConfig.sort = {
      priority: column.sort,
      fn: (a: any, b: any) => sortString(a, b, columnIndex)
    }
  }
  return columnConfig;
}

export const formatNzRows = (rows: any[], columns: UxTableColumnItem[]): CellType[][] => {
  return rows.map(row => {
    const alignedRows: CellType[] = [];
    columns.forEach((column) => {
      alignedRows.push(row[column.key] as CellType);
    });
    return alignedRows;
  });
}
