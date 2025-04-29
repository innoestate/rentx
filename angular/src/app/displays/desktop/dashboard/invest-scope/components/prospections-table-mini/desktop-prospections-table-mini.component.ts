import { Component, computed, ElementRef } from '@angular/core';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { ProspectionsTableMiniAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table-mini.adapter';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { UiTable } from 'src/app/ui/components/ui-table/models/ui-table.model';

@Component({
  selector: 'app-desktop-prospections-table-mini',
  standalone: false,
  templateUrl: './desktop-prospections-table-mini.component.html',
  styleUrl: './desktop-prospections-table-mini.component.scss'
})
export class DesktopProspectionsTableMiniComponent extends UiDisplayerComponent {

  table: UiTable = {
    columns: computed(() => (this.adapter.createColumns(this.prospectionsDto()))),
    rows: computed(() => (this.adapter.createRows(this.prospectionsDto()))),
    title: this.localization.getLocalization('prospections', 'tableTitle'),
    // commands: this.getCommands()
  };

  prospectionsDto = this.prospectionsData.getProspections();
  sellersDto = this.sellersData.getSellers();

  constructor(private prospectionsData: ProspectionsDataService,
    private sellersData: SellersDataService,
    private adapter: ProspectionsTableMiniAdapterService,
    private displayAdapter: InvestScopeDisplayManager,
    private localization: LocalizationsService,
    protected override elRef: ElementRef) {
    super(elRef)
  }


  selectItem(item: UiTableRow) {
    const prospection = this.prospectionsDto().find(p => p.id === item.data.id);
    this.displayAdapter.selectItem(prospection!);
  }
}
