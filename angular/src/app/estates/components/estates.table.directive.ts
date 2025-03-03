import { computed, Directive } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { EstatesUiTableAdapter } from "../adapters/table/estates.table.adapter";
import { EstatesDataService } from "../data/esates.data.service";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { LodgersDataService } from "src/app/lodgers/data/lodgers.data.service";
import { EstatesCommandsProvider } from "../commands/estates.commands.provider";

@Directive()
export class EstatesTableDirective {

  estates = this.estatesData.getEstates();
  owners = this.ownersData.getOwners();
  lodgers = this.lodgersData.getLodgers();
  estatesTable = computed(() => this.estatesUiAdapter.buildTableList(this.estates(), this.owners(), this.lodgers()));

  constructor(protected estatesData: EstatesDataService,
              protected estatesUiAdapter: EstatesUiTableAdapter,
              protected ownersData: OwnersDataService,
              protected lodgersData: LodgersDataService,
              protected estatesCommands: EstatesCommandsProvider) { }

  updateRow(row: UiTableRow) {
    const estate = this.estatesUiAdapter.extractUpdatedFieldsFromRow(this.estates(), row);
    this.estatesData.updateEstate(estate);
  }

  createNewEstate() {
    this.estatesCommands.createEstate();
  }

  createNewOwner() {
    this.estatesCommands.createOwner();
  }

  createNewLodger() {
    this.estatesCommands.createLodger();
  }

}
