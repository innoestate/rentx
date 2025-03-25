import { computed, Directive, Signal } from "@angular/core";
import { SellersDataService } from "../data/service/sellers.data.service";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { SellersTableAdapterService } from "../adapters/sellers.table.adapter.service";

@Directive()
export class SellersTableDirective {

  sellers = this.sellersDataService.get();
  table: Signal<UiTable> = this.getTable();

  constructor(private sellersDataService: SellersDataService, private sellersAdater: SellersTableAdapterService) { }

  getTable(): Signal<UiTable> {
    return computed(() => this.sellersAdater.buildTable(this.sellers()));
  }

}
