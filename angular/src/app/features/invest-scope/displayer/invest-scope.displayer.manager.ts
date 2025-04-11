import { Injectable } from "@angular/core";
import { Observable, of, take, tap } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { DisplayerManager } from "src/app/ui/displayers/displayer.manager";
import { InvestScopeDisplayStoreFacade } from "../states/display/facades/invest-scope.display-store.facade";
import { InvestScopeDisplayedElement } from "../models/invest-scope.display-map.model";

@Injectable()
export class InvestScopeDisplayManager extends DisplayerManager {

  constructor(private facade: InvestScopeDisplayStoreFacade, private localizations: LocalizationsService) {
    super();
  }

  override getNavigation(): Observable<{ label: string, navigate: string }[]> {
    return of([
      {
        label: this.localizations.getLocalization('prospections', 'label'),
        navigate: 'prospections'
      },
      {
        label: this.localizations.getLocalization('sellers', 'label'),
        navigate: 'sellers'
      }
    ]);
  }

  override init(navigation: 'prospections' | 'sellers') {
    this.facade.clearComponents();
    this.facade.addComponent('navigation');
    this.facade.addComponent(navigation);
    this.facade.addComponent('actions');
  }

  override navigate(navigation: 'prospections' | 'sellers') {
    this.facade.onNavigation().pipe(
      take(1),
      tap(actualNavigation => {
        this.facade.removeComponent(actualNavigation);
        this.facade.addComponent(navigation);
        this.facade.setNavigation(navigation);
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
