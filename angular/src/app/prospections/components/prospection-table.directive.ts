import { computed, Directive, Signal } from "@angular/core";
import { ProspectionsDataService } from "../data/service/prospections.data.service";
import { Prospection } from "../models/prospection.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { ProspectionsTableAdapter } from "../adapters/prospections.table.adapter";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { catchError, of, take } from "rxjs";
import { Prospection_Dto } from "../models/prospection.dto.model";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { SellersDataService } from "src/app/sellers/data/service/sellers.data.service";

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
    const propspectionBeforeUpdate = this.getProspectionBeforeUpdate(rowWidthUpdate.data['id']);
    const prospectionUpdates = this.extractProspectionUpdates(propspectionBeforeUpdate, rowWidthUpdate);
    this.performUpdate(propspectionBeforeUpdate, prospectionUpdates);
  }

  private getProspectionBeforeUpdate(id: string){
    const prospectionBeforeUpdate = this.prospections().find(prospection => prospection.id === id);
    if(!prospectionBeforeUpdate) throw new Error('Previous prospection not found');
    return prospectionBeforeUpdate;
  }

  private extractProspectionUpdates(propspectionBeforeUpdate: Prospection_Dto, rowWidthUpdate: UiTableRow){
    const modifications = this.adapter.getModifications(propspectionBeforeUpdate, rowWidthUpdate);
    return {...modifications, id: rowWidthUpdate.data['id']};
  }

  private performUpdate(prospectionBeforeUpdate: Prospection_Dto, prospectionUpdates: Partial<Prospection_Dto>){
    this.ProspectionsData.updateProspection(prospectionUpdates).pipe(
      take(1),
      catchError(() => this.reloadProspectionBeforeUpdate(prospectionBeforeUpdate))
    ).subscribe();
  }

  private reloadProspectionBeforeUpdate(prospectionBeforeUpdate: Prospection_Dto){
    this.ProspectionsData.reloadProspection(prospectionBeforeUpdate);
    return of(prospectionBeforeUpdate);
  }

}
