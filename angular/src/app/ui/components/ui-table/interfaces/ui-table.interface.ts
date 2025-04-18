import { Signal } from "@angular/core";
// import { UiDisplayerComponent } from "../../ui-displayer/ui-displayer.component";
import { UiTableRow } from "../models/ui-table-row.model";
import { UiTable } from "../models/ui-table.model";

export interface UiTableInterface {

  buildTable(): Signal<UiTable>;

  bindCommands(table: UiTable): UiTable;

  updateRow(row: UiTableRow): void;

}