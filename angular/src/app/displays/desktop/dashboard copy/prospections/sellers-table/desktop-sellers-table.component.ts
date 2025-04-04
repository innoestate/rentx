import { Component } from '@angular/core';
import { UiTableRowSellers } from 'src/app/features/sellers/adapters/sellers.table.adapter.type';
import { SellersTableDirective } from 'src/app/features/sellers/components/sellers.table.directive';

@Component({
  standalone: false,
  templateUrl: './desktop-sellers-table.component.html',
  styleUrl: './desktop-sellers-table.component.scss'
})
export class DesktopSellersTableComponent extends SellersTableDirective {

  override deleteRow(row: UiTableRowSellers) {
    this.commandsService.delete(row.data['id']);
    return true;
  }

}
