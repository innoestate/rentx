import { Component, computed, Directive, ElementRef, Signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { UiTableDirective } from "src/app/ui/components/ui-table/directive/ui-table.directive";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { SellersTableAdapterService } from "../adapters/sellers.table.adapter.service";
import { UiTableRowSellers, UiTableSellers } from "../adapters/sellers.table.adapter.type";
import { SellersCommandsService } from "../commands/table/sellers.commands.service";
import { SellersDataService } from "../data/services/sellers.data.service";

@Directive()
export class SellersTableDirective extends UiTableDirective {

  sellers = this.sellersDataService.getSellers();
  table: Signal<UiTable> = this.buildTable();

  constructor(private sellersDataService: SellersDataService,
    private sellersAdater: SellersTableAdapterService,
    protected commandsService: SellersCommandsService,
    protected override elRef: ElementRef) {
    super(elRef);
    // console.log('sellersTableDirective constructor');
  }

  override buildTable(): Signal<UiTableSellers> {
    return computed(() => {
      const table = this.sellersAdater.buildTable(this.sellers());
      this.bindCommands(table);
      return table;
    });
  }

  override bindCommands(table: UiTableSellers): UiTableSellers {
    table.columns.find(column => column.key === 'actions')!.dropdown.list[0].command = this.deleteRow.bind(this);
    return table;
  }

  override updateRow(rowWidthUpdate: UiTableRow) {
    this.verifyRowId(rowWidthUpdate);
    const update = this.sellersAdater.getDtoFromRow(rowWidthUpdate);
    this.sellersDataService.updateSeller(rowWidthUpdate.data.id, update).pipe(
      take(1),
      catchError(() => this.reloadSellerAsBeforeUpdate(rowWidthUpdate.data['id']))
    ).subscribe();
  }

  deleteRow(row: UiTableRowSellers) {
    // console.log('implement delete in display component.');
    return true;
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
