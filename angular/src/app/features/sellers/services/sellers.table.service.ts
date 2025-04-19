import { computed, Directive, Injectable, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { SellersTableAdapterService } from "../adapters/sellers.table.adapter.service";
import { UiTableRowSellers, UiTableSellers } from "../adapters/sellers.table.adapter.type";
import { SellersCommandsService } from "../commands/table/sellers.commands.service";
import { SellersDataService } from "../data/services/sellers.data.service";

@Injectable()
export class SellersTableService {

  sellers = this.sellersDataService.getSellers();
  table: Signal<UiTable> = this.buildTable();

  constructor(protected sellersDataService: SellersDataService,
    protected sellersAdater: SellersTableAdapterService,
    protected commandsService: SellersCommandsService) {
  }

  buildTable(): Signal<UiTableSellers> {
    return computed(() => {
      const table = this.sellersAdater.buildTable(this.sellers());
      this.bindCommands(table);
      return table;
    });
  }

  bindCommands(table: UiTableSellers): UiTableSellers {
    table.columns.find(column => column.key === 'actions')!.dropdown.list[0].command = this.deleteRow.bind(this);
    table.columns.find(column => column.key === 'actions')!.headDropdown.list[0].command = this.createSeller.bind(this);
    table.commands![0].command = this.createSeller.bind(this);
    return table;
  }

  updateRow(rowWidthUpdate: UiTableRow) {
    this.verifyRowId(rowWidthUpdate);
    const update = this.sellersAdater.getDtoFromRow(rowWidthUpdate);
    this.sellersDataService.updateSeller(rowWidthUpdate.data.id, update).pipe(
      take(1),
      catchError(() => this.reloadSellerAsBeforeUpdate(rowWidthUpdate.data['id']))
    ).subscribe();
  }

  deleteRow(row: UiTableRowSellers) {
    this.commandsService.delete(row.data['id']);
    return true;
  }

  protected verifyRowId(row: UiTableRow): void {
    if (!row.data['id']) throw new Error('Need an id in row data.');
  };

  private createSeller(){
    this.commandsService.createNew();
  }

  private getSellerBeforeUpdate(id: string) {
    const sellerBeforeUpdate = this.sellers().find(seller => seller.id === id);
    if (!sellerBeforeUpdate) throw new Error('Previous seller not found');
    return sellerBeforeUpdate;
  }


  private reloadSellerAsBeforeUpdate(id: string) {
    const sellerBeforeUpdate = this.getSellerBeforeUpdate(id);
    this.sellersDataService.reloadSeller(sellerBeforeUpdate.id!);
    return of(sellerBeforeUpdate);
  }

}
