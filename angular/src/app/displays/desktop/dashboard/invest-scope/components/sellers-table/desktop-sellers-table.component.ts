import { Component, ElementRef } from '@angular/core';
import { UiTableRowSellers } from 'src/app/features/sellers/adapters/sellers.table.adapter.type';
import { SellersTableService } from 'src/app/features/sellers/services/sellers.table.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';

@Component({
  standalone: false,
  templateUrl: './desktop-sellers-table.component.html',
  styleUrl: './desktop-sellers-table.component.scss'
})
export class DesktopSellersTableComponent extends UiDisplayerComponent {

  table = this.tableService.buildTable();

  constructor(private tableService: SellersTableService, protected override elRef: ElementRef) {
      super(elRef);
  }

  updateRow(row: UiTableRowSellers){
    this.tableService.updateRow(row);
  }

}
