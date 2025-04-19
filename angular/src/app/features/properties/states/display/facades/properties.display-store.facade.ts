import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PropertiesDisplay } from '../../../models/properties.display-map.model';
import * as PropertiesActions from '../ngrx/properties.actions';
import * as PropertiesSelectors from '../ngrx/properties.selectors';

@Injectable({
  providedIn: 'root',
})
export class PropertiesDisplayStoreFacade {
  constructor(private store: Store) {}

  clearComponents(): void {
    this.store.dispatch(PropertiesActions.clearDisplayedComponents());
  }

  addComponent(component: PropertiesDisplay): void {
    this.store.dispatch(PropertiesActions.addDisplayedComponent({ component }));
  }

  removeComponent(component: PropertiesDisplay): void {
    this.store.dispatch(PropertiesActions.removeDisplayedComponent({ component }));
  }

  setNavigation(navigation: 'estates' | 'owners' | 'lodgers'): void {
    this.store.dispatch(PropertiesActions.navigate({ navigation }));
  }

  onNavigation(): Observable<'estates' | 'owners' | 'lodgers'> {
    return this.store.select(PropertiesSelectors.selectNavigation);
  }

  onDisplayComponents(): Observable<PropertiesDisplay[]> {
    return this.store.select(PropertiesSelectors.selectDisplays);
  }
}
