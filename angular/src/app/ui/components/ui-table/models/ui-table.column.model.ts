import { NzTableFilterFn, NzTableFilterList } from "ng-zorro-antd/table";
import { UiColumnCell } from "./ui-column-cell.model";
import { UiTableRow } from "./ui-table-row.model";

export type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UiTableColumn {
  key: string,
  cell: UiColumnCell,
  filter?: {
    list: NzTableFilterList,
    function: NzTableFilterFn<UiTableRow>
  },
}
