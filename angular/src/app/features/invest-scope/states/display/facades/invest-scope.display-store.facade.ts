import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, take, tap } from "rxjs";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";
import { addDisplayedComponent, clearDisplayedComponents, navigate, removeDisplayedComponent } from "../ngrx/invest-scope.actions";
import { onInvestScopeDisplayedComponents, onInvestScopeNavigation } from "../ngrx/invest-scope.selectors";

@Injectable()
export class InvestScopeDisplayStoreFacade {

  constructor(private store: Store) { }

  init(navigation: 'prospections' | 'sellers' ){
    this.store.dispatch(clearDisplayedComponents());
    this.store.dispatch(addDisplayedComponent({ component: 'navigation'}));
    this.store.dispatch(addDisplayedComponent({ component: navigation }));
    this.store.dispatch(addDisplayedComponent({ component: 'actions'}));
  }

  navigate(navigation: 'prospections' | 'sellers'){

    this.store.select(onInvestScopeNavigation).pipe(
      take(1),
      tap(actualNavigation => {
        this.store.dispatch(removeDisplayedComponent({ component: actualNavigation }));
        this.store.dispatch(addDisplayedComponent({ component: navigation }));
        this.store.dispatch(navigate({ navigation }));
      })
    ).subscribe();

  }

  showDescription(id: string){}

  hideDescription(){}

  onNavigation(){
    return this.store.select(onInvestScopeNavigation);
  }

  onUpdateDisplay(): Observable<InvestScopeDisplayedElement[]> {
    return this.store.select(onInvestScopeDisplayedComponents);
  }

}
