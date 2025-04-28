import { Component, computed, ElementRef } from '@angular/core';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { ProspectionsTable2AdapterService } from 'src/app/features/prospections/adapters/table/prospections.table2.adapter';
import { ProspectionsCommandsService } from 'src/app/features/prospections/commands/prospections.commands.service';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiCell } from 'src/app/ui/components/ui-table/models/ui-cell.model';
import { UiTable } from 'src/app/ui/components/ui-table/models/ui-table.model';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends UiDisplayerComponent {

  table: UiTable = {
    columns: computed(() => (this.adapter.createColumns(this.prospectionsDto()))),
    rows: this.getRows(),
    title: this.localization.getLocalization('prospections', 'tableTitle'),
    commands: this.getCommands()
  };

  prospectionsDto = this.prospectionsData.getProspections();
  sellersDto = this.SellersData.getSellers();

  constructor(private adapter: ProspectionsTable2AdapterService,
              private prospectionsData: ProspectionsDataService,
              private SellersData: SellersDataService,
              private localization: LocalizationsService,
              private prospectionsCommands: ProspectionsCommandsService,
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

  private getCommands(){
    return [{
      name: 'add',
      size: 24,
      command: () => {
        this.prospectionsCommands.createNew(this.sellersDto());
      }
    }]
  }

}
