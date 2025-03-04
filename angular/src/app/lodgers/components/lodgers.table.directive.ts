import { computed, Directive } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { LodgersDataService } from "../data/lodgers.data.service";
import { LodgersTableAdapter } from "../adapters/lodgers.table.adapter";

@Directive()
export class LodgersTableDirective {

  lodgers = this.lodgersData.getLodgers();
  lodgersTable = computed(() => this.lodgersUiAdapter.buildTable(this.lodgers()))

  constructor(protected lodgersData: LodgersDataService, protected lodgersUiAdapter: LodgersTableAdapter) { }

  updateRow(row: UiTableRow) {
    const updates = this.lodgersUiAdapter.getUpdatedFields(row, this.lodgers());
    this.lodgersData.updateLodger(updates);
  }
}
