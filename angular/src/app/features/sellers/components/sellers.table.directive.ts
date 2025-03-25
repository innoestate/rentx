import { computed, Directive, Signal } from "@angular/core";
import { SellersDataService } from "../data/services/sellers.data.service";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { SellersTableAdapterService } from "../adapters/sellers.table.adapter.service";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { take } from "rxjs";
import { SellersTableCommands } from "../commands/table/sellers.table.commands.interface";
import { UiTableRowSellers, UiTableSellers } from "../adapters/sellers.table.adapter.type";
import { SellersCommandsService } from "../commands/table/sellers.commands.service";

@Directive()
export class SellersTableDirective implements SellersTableCommands{

  sellers = this.sellersDataService.getSellers();
  table: Signal<UiTable> = this.getTable();

  constructor(private sellersDataService: SellersDataService,
              private sellersAdater: SellersTableAdapterService,
              protected commandsService: SellersCommandsService) { }

  getTable(): Signal<UiTableSellers> {
    return computed(() => {
      const table = this.sellersAdater.buildTable(this.sellers());
      table.columns.find(column => column.key === 'actions')!.dropDownItems[0].command = this.delete.bind(this);
      return table;
    });
  }

  delete(row: UiTableRowSellers) {
    console.log('implement delete in display component.');
    return true;
  }

  updateRow(rowWidthUpdate: UiTableRow) {
    const update = this.sellersAdater.getDtoFromRow(rowWidthUpdate);
    console.log('update', update);
    this.sellersDataService.updateSeller(update).pipe(
      take(1),
      // catchError(() => this.reloadSellerAsBeforeUpdate(rowWidthUpdate.data['id']))
    ).subscribe();
  }

}
