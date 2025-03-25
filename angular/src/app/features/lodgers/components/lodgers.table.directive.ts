import { computed, Directive } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { LodgersDataService } from "../data/lodgers.data.service";
import { LodgersTableAdapterService } from "../adapters/lodgers.table.adapter";
import { catchError, of, take } from "rxjs";

@Directive()
export class LodgersTableDirective {

  lodgers = this.lodgersData.getLodgers();
  lodgersTable = computed(() => this.lodgersUiAdapter.buildTable(this.lodgers()))

  constructor(protected lodgersData: LodgersDataService, protected lodgersUiAdapter: LodgersTableAdapterService) { }

  updateRow(row: UiTableRow) {
    const updates = this.lodgersUiAdapter.buildUpdateFields(row, this.lodgers());
    this.lodgersData.updateLodger(updates).pipe(
      take(1),
      catchError(() => this.reloadLodgerForResetCellPreviusValue(row.data.id))
    )
  }

  reloadLodgerForResetCellPreviusValue(lodgerId: string) {
    const oldLodger = this.lodgers().find(l => l.id === lodgerId);
    this.lodgersData.updateLodger(oldLodger!);
    return of(null);
  }
}
