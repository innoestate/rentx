import { Injectable } from "@angular/core";
import { Observable, of, take, tap } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { DisplayerManager } from "src/app/ui/displayers/displayer.manager";
import { InvestScopeDisplayStoreFacade } from "../states/display/facades/invest-scope.display-store.facade";
import { InvestScopeDisplayedElement } from "../models/invest-scope.display-map.model";
import { DesktopSellersCommandsService } from "src/app/displays/desktop/dashboard/invest-scope/commands/desktop.sellers.commands.service";
import { DesktopProspectionsCommandsService } from "src/app/displays/desktop/dashboard/invest-scope/commands/desktop.prospections.commands.service";
import { SellersDataService } from "../../sellers/data/services/sellers.data.service";
import { Prospection } from "../../prospections/models/prospection.model";

@Injectable()
export class InvestScopeDisplayManager extends DisplayerManager {

  private sellers = this.sellersData.getSellers();

  constructor(private facade: InvestScopeDisplayStoreFacade,
    private sellersData: SellersDataService,
    private sellersCommands: DesktopSellersCommandsService,
    private prospectionsCommands: DesktopProspectionsCommandsService,
    private localizations: LocalizationsService) {
    super();
  }

  override init(navigation: 'prospections' | 'sellers') {
    this.facade.clearComponents();
    this.facade.addComponent('navigation');
    this.facade.addComponent('actions');
    this.navigate('prospections');
  }

  override navigate(navigation: 'prospections' | 'sellers') {
    this.facade.onNavigation().pipe(
      take(1),
      tap(actualNavigation => {
        this.facade.removeComponent(actualNavigation);
        this.facade.addComponent(navigation);
        this.facade.setNavigation(navigation);
        this.facade.deselectItem();

        if(actualNavigation === 'prospections' && navigation === 'prospections'){
          this.facade.addComponent('prospectionDescription');
        }else{
          this.facade.removeComponent('prospectionDescription');
        }

      })
    ).subscribe();
  }

  selectItem(prospection: Prospection) {
    this.facade.onSelectedItem().pipe(
      take(1),
      tap(item => {
        if(!item){
          this.facade.addComponent('prospectionDescription');
        }
      })
    ).subscribe();
    this.facade.selectItem(prospection);

  }

  override onNavigation() {
    return this.facade.onNavigation();
  }

  override onDisplayComponents(): Observable<InvestScopeDisplayedElement[]> {
    return this.facade.onDisplayComponents();
  }

}
