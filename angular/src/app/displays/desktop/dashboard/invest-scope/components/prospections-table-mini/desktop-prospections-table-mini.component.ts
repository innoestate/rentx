import { Component, computed, effect, ElementRef, model, Signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { filledProspection } from 'src/app/features/prospections/adapters/prospections.adapter.utils';
import { ProspectionsTableMiniAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table-mini.adapter';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { Prospection } from 'src/app/features/prospections/models/prospection.model';
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
    rows: computed(() => (this.adapter.createRows(this.prospections()))),
    title: this.localization.getLocalization('prospections', 'tableTitle'),
    // commands: this.getCommands()
  };

  prospectionsDto = this.prospectionsData.getProspections();
  prospections = this.fillProspections();
  sellersDto = this.sellersData.getSellers();

  select = model<UiTableRow | undefined>();

  constructor(private prospectionsData: ProspectionsDataService,
    private sellersData: SellersDataService,
    private investScopeDisplayStoreFacade: InvestScopeDisplayStoreFacade,
    private adapter: ProspectionsTableMiniAdapterService,
    private displayAdapter: InvestScopeDisplayManager,
    private localization: LocalizationsService,
    protected override elRef: ElementRef) {
    super(elRef)
    this.initSelection();
  }

  initSelection(){
    this.initSelectionAtStart();
    this.initSelectionEffects();
  }

  private fillProspections(): Signal<(Prospection | undefined)[]> {
    return computed(() => {
      const sellers = this.sellersDto();
      return this.prospectionsDto().map(p => filledProspection(p, sellers))
    })
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
        const item = this.prospectionsDto().find(p => p.id === this.select()!.data.id);
        this.displayAdapter.selectItem(item!);
      }
    })
  }


  selectItem(item: UiTableRow) {
    const prospectionDto = this.prospectionsDto().find(p => p.id === this.select()!.data.id);
    const prospection = filledProspection(prospectionDto, this.sellersDto())
    this.displayAdapter.selectItem(prospection!);
  }
}
