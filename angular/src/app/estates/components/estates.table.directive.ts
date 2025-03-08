import { computed, Directive, effect } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { EstatesUiTableAdapter } from "../adapters/table/estates.table.adapter";
import { EstatesDataService } from "../data/esates.data.service";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { LodgersDataService } from "src/app/lodgers/data/lodgers.data.service";
import { extractUpdatedFieldsFromRow } from "../adapters/table/estates.lodgers.table.utils";

@Directive()
export class EstatesTableDirective {

  estates = this.estatesData.getEstates();
  owners = this.ownersData.getOwners();
  lodgers = this.lodgersData.getLodgers();
  estatesTable = computed(() => {

    const estates = this.estates();
    const owners = this.owners();
    const lodgers = this.lodgers();

    if (!estates || !owners || !lodgers) return { columns: [], rows: [] };
    return this.estatesUiAdapter.buildTableList(estates, owners, lodgers);

  });

  constructor(protected estatesData: EstatesDataService,
              protected estatesUiAdapter: EstatesUiTableAdapter,
              protected ownersData: OwnersDataService,
              protected lodgersData: LodgersDataService) {
                console.log('EstatesTableDirective constructor');
              }

  updateRow(row: UiTableRow) {
    const estate = extractUpdatedFieldsFromRow(this.estates(), row);
    this.estatesData.updateEstate(estate);
  }

}
