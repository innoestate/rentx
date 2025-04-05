import { computed, Directive, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiTableDirective } from "src/app/ui/components/ui-table/directive/ui-table.directive";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { ProspectionsTableAdapterService } from "../../adapters/table/prospections.table.adapter.service";
import { UiTableProspections, UiTableRowProspection } from "../../adapters/table/prospections.table.adapter.type";
import { ProspectionsDataService } from "../../data/services/prospections.data.service";
import { Prospection } from "../../models/prospection.model";
import { ProspectionsCommandsService } from "../../commands/prospections.commands.service";

@Directive()
export class ProspectionsTableDirective extends UiTableDirective {

  prospections: Signal<Prospection[]> = this.prospectionsData.getProspections();
  sellers: Signal<Seller_Dto[]> = this.SellersData.getSellers();
  table: Signal<UiTableProspections> = this.buildTable();

  constructor(protected prospectionsData: ProspectionsDataService,
    protected SellersData: SellersDataService,
    protected tableAdapter: ProspectionsTableAdapterService,
    protected prospectionCommands: ProspectionsCommandsService) {
    console.log('prospectionsTableDirective constructor.');
    super();
  }

  override buildTable() {
    return computed(() => {
      let table = this.tableAdapter.buildTable(this.prospections(), this.sellers());
      table = this.bindCommands(table);
      return table;
    })
  }

  protected override bindCommands(table: UiTableProspections): UiTableProspections {
    table.columns.find(column => column.key === 'actions')!.dropDownItems[0].command = this.deleteRow.bind(this);
    table.columns.find(column => column.key === 'actions')!.command = this.createProspection.bind(this);
    return table;
  }

  override updateRow(rowWidthUpdate: UiTableRowProspection) {
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
    console.log('implement delete in displays component.')
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
