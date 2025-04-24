import { Signal } from "@angular/core";
import { UiTable2Row } from "./ui-table-row.model";
import { UiTable2Column } from "./ui-table.column.model";
import { UiIcon } from "../../ui-icon/models/ui-icon.model";

export interface UiTable2 {
  columns: Signal<UiTable2Column[]>;
  rows: Signal<UiTable2Row[]>;
  title?: string;
  commands?: UiIcon[];
  // fixedColumns?: { left: number, right: number };
  // backgroundImagePath?: string;
}
