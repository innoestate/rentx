import { computed, Directive } from "@angular/core";
import { OwnersDataService } from "../data/owners.data.service";
import { OwnersTableAdapter } from "../adapters/table/owners.table.adapter";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";

@Directive()
export class OwnersTableDirective {

  owners = this.ownersData.getOwners();
  ownersTable = computed(() => this.ownersUiAdapter.buildTable(this.owners()))

  constructor(protected ownersData: OwnersDataService, protected ownersUiAdapter: OwnersTableAdapter) { }

  updateRow(row: UiTableRow) {

  }
}
