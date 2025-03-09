import { computed, Directive } from "@angular/core";
import { take, tap } from "rxjs";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { OwnersTableAdapterService } from "../adapters/table/owners.table.adapter";
import { OwnersDataService } from "../data/owners.data.service";

@Directive()
export class OwnersTableDirective {

  owners = this.ownersData.getOwners();
  ownersTable = computed(() => this.ownersUiAdapter.buildTable(this.owners()))

  constructor(protected ownersData: OwnersDataService, protected ownersUiAdapter: OwnersTableAdapterService) { }

  updateRow(row: UiTableRow) {
    const updates = this.ownersUiAdapter.buildUpdateFields(row, this.owners());
    this.ownersData.updateOwner(updates).pipe(
      take(1),
      tap(() => this.reloadOwnerForResetCellPreviusValue(row.data.id))
    )
  }

  reloadOwnerForResetCellPreviusValue(ownerId: string) {
    const oldOwner = this.owners().find(o => o.id === ownerId);
    this.ownersData.updateOwner(oldOwner!);
  }
}
