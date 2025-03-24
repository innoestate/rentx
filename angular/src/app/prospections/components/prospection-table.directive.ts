import { computed, Directive, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { SellersDataService } from "src/app/sellers/data/service/sellers.data.service";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableProspection } from "../adapters/interfaces/prospections.table.adapter.interfaces";
import { ProspectionsTableAdapter } from "../adapters/prospections.table.adapter";
import { ProspectionsTableCommands } from "../commands/prospections.table.command.interface";
import { ProspectionsDataService } from "../data/service/prospections.data.service";
import { Prospection } from "../models/prospection.model";

@Directive()
export class ProspectionTableDirective implements ProspectionsTableCommands {

  prospections: Signal<Prospection[]> = this.prospectionsData.getProspections();
  sellers: Signal<Seller_Dto[]> = this.SellersData.get();
  table: Signal<UiTableProspection> = this.buildTable();

  constructor(protected prospectionsData: ProspectionsDataService, protected SellersData: SellersDataService, protected adapter: ProspectionsTableAdapter) {
    console.log('prospectionTableDirective constructor.');
  }

  buildTable() {
    return computed(() => {
      const table = this.adapter.buildTable(this.prospections(), this.sellers());
      table.columns.find(column => column.key === 'actions')!.dropDownItems[0].command = this.delete.bind(this);
      return table;
    })
  }

  updateRow(rowWidthUpdate: UiTableRow) {
    const update = { id: rowWidthUpdate.data['id'], ...rowWidthUpdate.cells }
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
