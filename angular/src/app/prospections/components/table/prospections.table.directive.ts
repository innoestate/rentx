import { computed, Directive, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { SellersDataService } from "src/app/sellers/data/service/sellers.data.service";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableProspections } from "src/app/features/prospections/adapters/table/prospections.table.adapter.type";
import { ProspectionsTableCommands } from "src/app/features/prospections/commands/table/prospections.table.commands.interface";
import { Prospection } from "src/app/features/prospections/models/prospection.model";
import { ProspectionsDataService } from "src/app/features/prospections/data/services/prospections.data.service";
import { ProspectionsTableAdapterService } from "src/app/features/prospections/adapters/table/prospections.table.adapter.service";

@Directive()
export class ProspectionsTableDirective implements ProspectionsTableCommands {

  prospections: Signal<Prospection[]> = this.prospectionsData.getProspections();
  sellers: Signal<Seller_Dto[]> = this.SellersData.get();
  table: Signal<UiTableProspections> = this.buildTable();

  constructor(protected prospectionsData: ProspectionsDataService, protected SellersData: SellersDataService, protected tableAdapter: ProspectionsTableAdapterService) {
    console.log('prospectionsTableDirective constructor.');
  }

  buildTable() {
    return computed(() => {
      const table = this.tableAdapter.buildTable(this.prospections(), this.sellers());
      table.columns.find(column => column.key === 'actions')!.dropDownItems[0].command = this.delete.bind(this);
      return table;
    })
  }

  updateRow(rowWidthUpdate: UiTableRow) {
    const update = this.tableAdapter.getDtoFromRow(rowWidthUpdate);
    this.prospectionsData.updateProspection(update).pipe(
      take(1),
      catchError(() => this.reloadProspectionAsBeforeUpdate(rowWidthUpdate.data['id']))
    ).subscribe();
  }

  delete(row: UiTableRow) {
    console.log('implement delete in view')
    return true;
  }

  private getProspectionBeforeUpdate(id: string) {
    const prospectionBeforeUpdate = this.prospections().find(prospection => prospection.id === id);
    if (!prospectionBeforeUpdate) throw new Error('Previous prospection not found');
    return prospectionBeforeUpdate;
  }

  private reloadProspectionAsBeforeUpdate(id: string) {
    const prospectionBeforeUpdate = this.getProspectionBeforeUpdate(id);
    this.prospectionsData.reloadProspection(prospectionBeforeUpdate.id!);
    return of(prospectionBeforeUpdate);
  }

}
