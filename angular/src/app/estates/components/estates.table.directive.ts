import { computed, Directive } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { EstatesUiTableAdapter } from "../adapters/table/estates.table.adapter";
import { EstatesDataService } from "../data/esates.data.service";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";

@Directive()
export class EstatesTableDirective {

  estates = this.estatesData.getEstates();
  owners = this.ownersData.getOwners();
  estatesTable = computed(() => this.estatesUiAdapter.buildTableList(this.estates(), this.owners()));

  constructor(protected estatesData: EstatesDataService, protected estatesUiAdapter: EstatesUiTableAdapter, protected ownersData: OwnersDataService) { }

  updateRow(row: UiTableRow) {
    const estate = this.estatesUiAdapter.extractEstateFromRow(this.estates(), row);
    this.estatesData.updateEstate(estate);
  }

}
