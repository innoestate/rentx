import { computed, Directive, effect } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { EstatesUiTableAdapter } from "../adapters/table/estates.table.adapter.service";
import { EstatesDataService } from "../data/service/esates.data.service";
import { OwnersDataService } from "src/app/features/owners/data/owners.data.service";
import { LodgersDataService } from "src/app/features/lodgers/data/lodgers.data.service";
import { extractUpdatedFieldsFromRow } from "../adapters/table/estates.lodgers.table.utils";
import { catchError, of, take } from "rxjs";
import { Estate } from "../models/estate.model";
import { fillEstates } from "../adapters/estate.adapter.utils";
import { RentsDataService } from "src/app/features/rents/data/service/rents.data.service";

@Directive()
export class EstatesTableDirective {

  estates_dto = this.estatesData.getEstates();
  owners_dto = this.ownersData.getOwners();
  lodgers_dto = this.lodgersData.getLodgers();
  monthlyRents_dto = this.monthlyRentsData.get();

  estates = computed(() => fillEstates(this.estates_dto(), this.owners_dto(), this.lodgers_dto(), this.monthlyRents_dto()));
  estatesTable = computed(() => {

    const estates = this.estates();
    const owners = this.owners_dto();
    const lodgers = this.lodgers_dto();

    if (!estates || !owners || !lodgers) return { columns: [], rows: [] };
    return this.estatesUiAdapter.buildTableList(estates, owners, lodgers);

  });

  constructor(protected estatesData: EstatesDataService,
              protected estatesUiAdapter: EstatesUiTableAdapter,
              protected ownersData: OwnersDataService,
              protected lodgersData: LodgersDataService,
              protected monthlyRentsData: RentsDataService) {
                console.log('EstatesTableDirective constructor');
              }

  updateRow(row: UiTableRow) {
    const estate = extractUpdatedFieldsFromRow(this.estates(), row);
    this.estatesData.updateEstate(estate).pipe(
      catchError(() => this.reloadEstateForResetCellPreviusValue(row.data.id))
    ).pipe(
      take(1)
    ).subscribe();
  }

  private reloadEstateForResetCellPreviusValue(estateId: string) {
    const oldEstate = this.estates().find(e => e.id === estateId);
    this.estatesData.updateEstate(oldEstate as Partial<Estate>);
    return of(null);
  }

}
