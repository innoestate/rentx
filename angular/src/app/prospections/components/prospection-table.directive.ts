import { computed, Directive, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { SellersDataService } from "src/app/sellers/data/service/sellers.data.service";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { ProspectionsTableAdapter } from "../adapters/prospections.table.adapter";
import { ProspectionsDataService } from "../data/service/prospections.data.service";
import { Prospection } from "../models/prospection.model";

@Directive()
export class ProspectionTableDirective {

  prospections: Signal<Prospection[]> = this.ProspectionsData.getProspections();
  sellers: Signal<Seller_Dto[]> = this.SellersData.get();
  table: Signal<UiTable> = this.buildTable();

  constructor(private ProspectionsData: ProspectionsDataService, private SellersData: SellersDataService, private adapter: ProspectionsTableAdapter) {
    console.log('prospectionTableDirective constructor.');
  }

  buildTable() {
    return computed(() => {
      return this.adapter.buildTable(this.prospections(), this.sellers());
    })
  }

  updateRow(rowWidthUpdate: UiTableRow) {
    const update = { id: rowWidthUpdate.data['id'], ...rowWidthUpdate.cells }
    this.ProspectionsData.updateProspection(update).pipe(
      take(1),
      catchError(() => this.reloadProspectionAsBeforeUpdate(rowWidthUpdate.data['id']))
    ).subscribe();
  }

  private getProspectionBeforeUpdate(id: string){
    const prospectionBeforeUpdate = this.prospections().find(prospection => prospection.id === id);
    if(!prospectionBeforeUpdate) throw new Error('Previous prospection not found');
    return prospectionBeforeUpdate;
  }

  private reloadProspectionAsBeforeUpdate(id: string){
    const prospectionBeforeUpdate = this.getProspectionBeforeUpdate(id);
    this.ProspectionsData.reloadProspection(prospectionBeforeUpdate.id!);
    return of(prospectionBeforeUpdate);
  }

}
