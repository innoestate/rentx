import { Component, computed, ElementRef } from '@angular/core';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { ProspectionsTable2AdapterService } from 'src/app/features/prospections/adapters/table/prospections.table2.adapter';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiCell } from 'src/app/ui/components/ui-table-2/models/ui-cell.model';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends UiDisplayerComponent {

  table = {
    columns: computed(() => (this.adapter.createColumns())),
    rows: this.getRows()
  };

  prospectionsDto = this.prospectionsData.getProspections();
  sellersDto = this.SellersData.getSellers();

  constructor(private adapter: ProspectionsTable2AdapterService,
              private prospectionsData: ProspectionsDataService,
              private SellersData: SellersDataService,
              private displayManager: InvestScopeDisplayManager,
              protected override elRef: ElementRef) {
    super(elRef);
  }

  editCell(event: { id: string, key: string, cell: UiCell} ){
    const value = this.adapter.getUpdatableValue(this.sellersDto(), event.key, event.cell);
    this.prospectionsData.updateProspection(event.id, value);
  }

  getRows(){
    return computed(() => {
      const rows = this.adapter.createRows(this.prospectionsDto(), this.sellersDto());
      return rows;
    })
  }

}
