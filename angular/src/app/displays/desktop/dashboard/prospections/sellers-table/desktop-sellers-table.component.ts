import { Component } from '@angular/core';
import { SellersTableDirective } from 'src/app/features/sellers/components/sellers.table.directive';

@Component({
  standalone: false,
  templateUrl: './desktop-sellers-table.component.html',
  styleUrl: './desktop-sellers-table.component.scss'
})
export class DesktopSellersTableComponent extends SellersTableDirective {

}
