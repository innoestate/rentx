import { NzUxColumnConfig } from "../models/nz-ux-column.config.model";
import { UxTableColumnItem } from "../models/ux-table.column.model";

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
