import { computed, Directive, ElementRef, Injectable, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { UiTableInterface } from "src/app/ui/components/ui-table/interfaces/ui-table.interface";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { LodgersTableAdapterService } from "../adapters/lodgers.table.adapter";
import { LodgersCommandsService } from "../commands/lodgers.commands.service";
import { LodgersDataService } from "../data/lodgers.data.service";

@Injectable()
export class LodgersTableService implements UiTableInterface {

  lodgers = this.lodgersData.getLodgers();
  lodgersTable = this.buildTable();

  constructor(protected lodgersData: LodgersDataService,
    protected lodgersUiAdapter: LodgersTableAdapterService,
    protected lodgersCommands: LodgersCommandsService,
  ) { }

  buildTable(): Signal<UiTable> {
    return computed(() => {
      const table = this.lodgersUiAdapter.buildTable(this.lodgers()!);
      this.bindCommands(table);
      return table;
    })
  }

  updateRow(row: UiTableRow) {
    const updates = this.lodgersUiAdapter.buildUpdateFields(row, this.lodgers());
    this.lodgersData.updateLodger(row.data.id!, updates).pipe(
      take(1),
      catchError(() => this.reloadLodgerForResetCellPreviusValue(row.data.id))
    )
  }

  bindCommands(table: UiTable) {
    table.columns.find(c => c.key === 'actions')!.headDropdown!.list[0].command = (row: UiTableRow) => this.lodgersCommands.createLodger()
    table.commands![0].command = () => this.lodgersCommands.createLodger()
    table.columns.find(c => c.key === 'actions')!.dropdown!.list[0].command = (row: UiTableRow) => this.lodgersCommands.deleteLodger(row.data.id!)
    return table;
  }

  private reloadLodgerForResetCellPreviusValue(lodgerId: string) {
    const oldLodger = this.lodgers().find(l => l.id === lodgerId);
    this.lodgersData.updateLodger(lodgerId, { ...oldLodger! });
    return of(null);
  }
}
