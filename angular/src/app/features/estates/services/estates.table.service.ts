import { computed, Directive, effect, Injectable } from "@angular/core";
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
import { UiTableInterface } from "src/app/ui/components/ui-table/interfaces/ui-table.interface";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { EstatesCommandsService } from "../commands/estates.commands.service";

@Injectable()
export class EstatesTableService implements UiTableInterface {

  estates_dto = this.estatesData.getEstates();
  owners_dto = this.ownersData.getOwners();
  lodgers_dto = this.lodgersData.getLodgers();
  monthlyRents_dto = this.monthlyRentsData.get();

  estates = computed(() => fillEstates(this.estates_dto(), this.owners_dto(), this.lodgers_dto(), this.monthlyRents_dto()));
  estatesTable = this.buildTable();

  constructor(protected estatesData: EstatesDataService,
              protected estatesUiAdapter: EstatesUiTableAdapter,
              protected estatesCommands: EstatesCommandsService,
              protected ownersData: OwnersDataService,
              protected lodgersData: LodgersDataService,
              protected monthlyRentsData: RentsDataService) {}

  buildTable(){
    return computed(() => {

      const estates = this.estates();
      const owners = this.owners_dto();
      const lodgers = this.lodgers_dto();

      if (!estates || !owners || !lodgers) return { columns: [], rows: [] };
      const table = this.estatesUiAdapter.buildTableList(estates, owners, lodgers);
      return this.bindCommands(table);
    });
  }

  bindCommands(table: UiTable): UiTable {
    table.commands![0].command = this.estatesCommands.createEstate.bind(this.estatesCommands);
    table.columns.find(c => c.key === 'actions')!.headDropdown!.list[0].command = (row: UiTableRow) => this.estatesCommands.createEstate()
    table.columns.find(c => c.key === 'actions')!.dropdown!.list[0].command = (row: UiTableRow) => this.estatesCommands.deleteEstate(row.data.id!)

    return table;
  }

  updateRow(row: UiTableRow) {
    const estate = extractUpdatedFieldsFromRow(this.estates(), row);
    this.estatesData.updateEstate(row.data.id!, estate).pipe(
      catchError(() => this.reloadEstateForResetCellPreviusValue(row.data.id))
    ).pipe(
      take(1)
    ).subscribe();
  }

  private reloadEstateForResetCellPreviusValue(estateId: string) {
    const oldEstate = this.estates().find(e => e.id === estateId);
    this.estatesData.updateEstate(oldEstate!.id!, oldEstate as Partial<Estate>);
    return of(null);
  }

}
