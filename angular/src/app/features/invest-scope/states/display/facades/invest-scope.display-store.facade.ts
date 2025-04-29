import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";
import { addDisplayedComponent, addDisplayedComponents, clearDisplayedComponents, navigate, removeDisplayedComponent, selectItem } from "../ngrx/invest-scope.actions";
import { onInvestScopeDisplayedComponents, onInvestScopeNavigation, onInvestScopeSelectedItem } from "../ngrx/invest-scope.selectors";
import { Prospection } from "src/app/features/prospections/models/prospection.model";
import { InvestScopeNavigation } from "../../../models/invest-scope.navigation.model";

@Injectable()
export class InvestScopeDisplayStoreFacade {

  constructor(private store: Store) {}

  clearComponents() {
    this.store.dispatch(clearDisplayedComponents());
  }

  addComponent(component: InvestScopeDisplayedElement) {
    this.store.dispatch(addDisplayedComponent({ component }));
  }

  addComponents(components: InvestScopeDisplayedElement[]) {
    this.store.dispatch(addDisplayedComponents({ components }));
  }

  removeComponent(component: string) {
    this.store.dispatch(removeDisplayedComponent({ component }));
  }

  setNavigation(navigation: InvestScopeNavigation) {
    this.store.dispatch(navigate({ navigation }));
  }

  selectItem(item: Prospection) {
    this.store.dispatch(selectItem({ item }));
  }

  deselectItem() {
    this.store.dispatch(selectItem({ item: null }));
  }

  onSelectedItem(): Observable<Prospection | null> {
    return this.store.select(onInvestScopeSelectedItem);
  }

  onNavigation() {
    return this.store.select(onInvestScopeNavigation);
  }

  onDisplayComponents(): Observable<InvestScopeDisplayedElement[]> {
    return this.store.select(onInvestScopeDisplayedComponents);
  }

}
