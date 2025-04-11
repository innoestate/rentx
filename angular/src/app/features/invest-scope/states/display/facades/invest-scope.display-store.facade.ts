import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";
import { addDisplayedComponent, clearDisplayedComponents, navigate, removeDisplayedComponent } from "../ngrx/invest-scope.actions";
import { onInvestScopeDisplayedComponents, onInvestScopeNavigation } from "../ngrx/invest-scope.selectors";

@Injectable()
export class InvestScopeDisplayStoreFacade {

  constructor(private store: Store) {}

  clearComponents() {
    this.store.dispatch(clearDisplayedComponents());
  }

  addComponent(component: InvestScopeDisplayedElement) {
    this.store.dispatch(addDisplayedComponent({ component }));
  }

  removeComponent(component: string) {
    this.store.dispatch(removeDisplayedComponent({ component }));
  }

  setNavigation(navigation: 'prospections' | 'sellers') {
    this.store.dispatch(navigate({ navigation }));
  }

  onNavigation() {
    return this.store.select(onInvestScopeNavigation);
  }

  onDisplayComponents(): Observable<InvestScopeDisplayedElement[]> {
    return this.store.select(onInvestScopeDisplayedComponents);
  }

}
