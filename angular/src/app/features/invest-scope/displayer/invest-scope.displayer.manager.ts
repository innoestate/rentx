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
        this.facade.addComponent(navigation);
        this.facade.setNavigation(navigation);
        this.facade.deselectItem();

        if (navigation === 'prospections') {
          this.facade.addComponent('prospectionDescription');
        } else {
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
