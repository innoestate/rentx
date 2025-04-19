import { Signal } from "@angular/core";
import { UiTable2Row } from "./ui-table-row.model";
import { UiTable2Column } from "./ui-table.column.model";

export interface UiTable2 {
  columns: Signal<UiTable2Column[]>;
  rows: Signal<UiTable2Row[]>;
  title?: string;
  commands?: UiTableCommandItem[];
  // fixedColumns?: { left: number, right: number };
  // backgroundImagePath?: string;
}

export interface UiTableCommandItem {
  label: string;
  icon: string;
  command: () => void;
}
