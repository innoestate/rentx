import { Component, ElementRef } from '@angular/core';
import { SellersTableAdapterService } from 'src/app/features/sellers/adapters/sellers.table.adapter.service';
import { UiTableRowSellers } from 'src/app/features/sellers/adapters/sellers.table.adapter.type';
import { SellersTableDirective } from 'src/app/features/sellers/components/sellers.table.directive';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { DesktopSellersCommandsService } from '../../commands/desktop.sellers.commands.service';

@Component({
  standalone: false,
  templateUrl: './desktop-sellers-table.component.html',
  styleUrl: './desktop-sellers-table.component.scss'
})
export class DesktopSellersTableComponent extends SellersTableDirective {

  constructor(protected override sellersDataService: SellersDataService,
      protected override sellersAdater: SellersTableAdapterService,
      protected override commandsService: DesktopSellersCommandsService) {
      super(sellersDataService, sellersAdater, commandsService);
  }

  override deleteRow(row: UiTableRowSellers) {
    this.commandsService.delete(row.data['id']);
    return true;
  }

}
