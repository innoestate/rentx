import { Directive, ElementRef, Signal } from "@angular/core";
// import { UiDisplayerComponent } from "../../ui-displayer/ui-displayer.component";
import { UiDisplayerComponent } from "../../ui-displayer/ui-displayer.component";
import { UiTableRow } from "../models/ui-table-row.model";
import { UiTable } from "../models/ui-table.model";

@Directive()
export class UiTableDirective extends UiDisplayerComponent {

  constructor(protected override elRef: ElementRef) {
    super(elRef);
  }

  protected buildTable(): Signal<UiTable> {
    return null as any;
  };

  protected bindCommands(table: UiTable): UiTable {
    return null as any;
  }

  protected updateRow(row: UiTableRow): void {}

  protected verifyRowId(row: UiTableRow): void {
    if (!row.data['id']) throw new Error('Need an id in row data.');
  };

}