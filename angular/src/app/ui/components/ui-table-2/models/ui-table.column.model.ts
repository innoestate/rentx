import { UiCell } from "./ui-cell.model";

export type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UiTable2Column {
  key: string,
  cell: UiCell,//We gone see the dropdown

  // editable?: boolean,
  // sort?: Priority,
  // filter?: {text: string, value: string}[],
  // filterFn?: NzTableFilterFn<UiTableRow>,
}
