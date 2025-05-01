import { Component, computed, effect, ElementRef, model } from '@angular/core';
import { take, tap } from 'rxjs';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { filledProspection } from 'src/app/features/prospections/adapters/prospections.adapter.utils';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter';
import { ProspectionsCommandsService } from 'src/app/features/prospections/commands/prospections.commands.service';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { Prospection } from 'src/app/features/prospections/models/prospection.model';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiCell } from 'src/app/ui/components/ui-table/models/ui-cell.model';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
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

  select = model<UiTableRow>();

  constructor(private adapter: ProspectionsTableAdapterService,
              private prospectionsData: ProspectionsDataService,
              private SellersData: SellersDataService,
              private localization: LocalizationsService,
              private prospectionsCommands: ProspectionsCommandsService,
              private investScopeDisplayStoreFacade: InvestScopeDisplayStoreFacade,
              private displayAdapter: InvestScopeDisplayManager,
              protected override elRef: ElementRef) {
    super(elRef);
    this.initSelection();
  }

  initSelection(){
    this.initSelectionAtStart();
    this.initSelectionEffects();
  }

  private initSelectionAtStart(){
    this.investScopeDisplayStoreFacade.onSelectedItem().pipe(
      take(1),
      tap(prospection => {
        const row = this.table.rows().find(row => row.data.id === prospection?.id);
        if(row){
          this.select.set(row!);
        }
      })
    ).subscribe();
  }

  private initSelectionEffects(){
    effect(() => {
      if(this.select()){
        const prospectionDto = this.prospectionsDto().find(p => p.id === this.select()!.data.id);
        const prospection = filledProspection(prospectionDto, this.sellersDto())
        this.displayAdapter.selectItem(prospection!);
      }
    })
  }

  editCell(event: { id: string, key: string, cell: UiCell} ){
    const value = this.adapter.getUpdatableValue(this.sellersDto(), event.key, event.cell);
    this.prospectionsData.updateProspection(event.id, value);
  }

  selectItem(tableRow: UiTableRow){
    const item = this.prospectionsDto().find(p => p.id === tableRow.data.id);
    this.displayAdapter.selectItem(item!);
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
