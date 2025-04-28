import { Signal } from "@angular/core";
import { UiTableRow } from "./ui-table-row.model";
import { UiTableColumn } from "./ui-table.column.model";
import { UiIcon } from "../../ui-icon/models/ui-icon.model";

export interface UiTable {
  columns: Signal<UiTableColumn[]>;
  rows: Signal<UiTableRow[]>;
  title?: string;
  commands?: UiIcon[];
  // fixedColumns?: { left: number, right: number };
  // backgroundImagePath?: string;
}
