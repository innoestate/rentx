import { Injectable } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { DisplayerManager } from "src/app/ui/displayers/displayer.manager";
import { Prospection } from "../../prospections/models/prospection.model";
import { InvestScopeDisplayedElement } from "../models/invest-scope.display-map.model";
import { InvestScopeDisplayStoreFacade } from "../states/display/facades/invest-scope.display-store.facade";
import { InvestScopeNavigation } from "../models/invest-scope.navigation.model";

@Injectable()
export class InvestScopeDisplayManager extends DisplayerManager {

  constructor(private facade: InvestScopeDisplayStoreFacade) {
    super();
  }

  override init() {
    this.facade.clearComponents();
    this.facade.addComponent('navigation');
    this.facade.addComponent('actions');
    this.navigate('prospections');
  }

  override navigate(navigation: InvestScopeNavigation) {
    this.facade.onNavigation().pipe(
      take(1),
      tap(actualNavigation => {

        this.facade.removeComponent(actualNavigation);
        this.facade.setNavigation(navigation);

        this.facade.clearComponents();
        if(navigation === 'prospections'){
          this.facade.addComponents(['navigation', 'prospections', 'actions', 'prospectionDescription']);
        }else if(navigation === 'sellers'){
          this.facade.addComponents(['navigation', 'sellers', 'actions']);
        }else if(navigation === 'offer'){
          this.facade.addComponents(['backToProspectionNavigation', 'prospectionsTableMini', 'prospectionDescription', 'offer']);
        }

      })
    ).subscribe();
  }

  selectItem(prospection: Prospection) {
    this.facade.onSelectedItem().pipe(
      take(1),
      tap(item => {
        if(!item || item.id !== prospection.id){
          console.log('selectItem', prospection);
          this.facade.selectItem(prospection);
        }
      })
    ).subscribe();
  }

  override onNavigation() {
    return this.facade.onNavigation();
  }

  override onDisplayComponents(): Observable<InvestScopeDisplayedElement[]> {
    return this.facade.onDisplayComponents();
  }

}
