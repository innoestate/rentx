import { computed, Injectable, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { ProspectionsTableAdapterService } from "../adapters/table/prospections.table.adapter.service";
import { UiTableProspections, UiTableRowProspection } from "../adapters/table/prospections.table.adapter.type";
import { ProspectionsCommandsService } from "../commands/prospections.commands.service";
import { ProspectionsDataService } from "../data/services/prospections.data.service";
import { Prospection } from "../models/prospection.model";

@Injectable()
export class ProspectionsTableService {

  prospections: Signal<Prospection[]> = this.prospectionsData.getProspections();
  sellers: Signal<Seller_Dto[]> = this.SellersData.getSellers();
  table: Signal<UiTableProspections> = this.buildTable();

  constructor(protected prospectionsData: ProspectionsDataService,
    protected SellersData: SellersDataService,
    protected tableAdapter: ProspectionsTableAdapterService,
    protected prospectionCommands: ProspectionsCommandsService) {
  }

  buildTable() {
    return computed(() => {
      let table = this.tableAdapter.buildTable(this.prospections()!, this.sellers());
      table = this.bindCommands(table);
      return table;
    })
  }

  protected bindCommands(table: UiTableProspections): UiTableProspections {
    table.columns.find(column => column.key === 'actions')!.dropdown!.list[0].command = this.deleteRow.bind(this);
    table.columns.find(column => column.key === 'actions')!.headDropdown!.list[0].command = this.createProspection.bind(this);
    table.commands![0].command = this.createProspection.bind(this);
    return table;
  }

  updateRow(rowWidthUpdate: UiTableRowProspection) {
    this.verifyRowId(rowWidthUpdate);
    const update = this.tableAdapter.getDtoFromRow(rowWidthUpdate);
    this.prospectionsData.updateProspection(rowWidthUpdate.data.id, update).pipe(
      take(1),
      catchError(() => this.reloadProspectionAsBeforeUpdate(rowWidthUpdate.data['id']))
    ).subscribe();
  }

  protected createProspection() {
    this.prospectionCommands.createNew(this.sellers());
  }

  deleteRow(row: UiTableRow) {
    this.prospectionCommands.delete(row.data['id']);
    return true;
  }

  protected verifyRowId(row: UiTableRow): void {
    if (!row.data['id']) throw new Error('Need an id in row data.');
  };

  private getProspectionBeforeUpdate(id: string) {
    const prospectionBeforeUpdate = this.prospections()!.find(prospection => prospection.id === id);
    if (!prospectionBeforeUpdate) throw new Error('Previous prospection not found');
    return prospectionBeforeUpdate;
  }

  private reloadProspectionAsBeforeUpdate(id: string) {
    const prospectionBeforeUpdate = this.getProspectionBeforeUpdate(id);
    this.prospectionsData.reloadProspection(prospectionBeforeUpdate.id!);
    return of(prospectionBeforeUpdate);
  }

}
