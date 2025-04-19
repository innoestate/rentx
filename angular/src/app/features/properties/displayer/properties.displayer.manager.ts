import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { DisplayerManager } from 'src/app/ui/displayers/displayer.manager';
import { PropertiesDisplay } from '../models/properties.display-map.model';
import { PropertiesDisplayStoreFacade } from '../states/display/facades/properties.display-store.facade';

@Injectable({
  providedIn: 'root',
})
export class PropertiesDisplayerManager extends DisplayerManager {
  constructor(private facade: PropertiesDisplayStoreFacade) {
    super();
  }

  override init() {
    this.facade.clearComponents();
    this.facade.addComponent('navigation');
    this.facade.addComponent('actions');
    this.navigate('estates');
  }

  override navigate(navigation: 'estates' | 'owners' | 'lodgers') {
    this.facade.onNavigation().pipe(
      take(1),
      tap(actualNavigation => {
        this.facade.removeComponent(actualNavigation);
        this.facade.addComponent(navigation);
        this.facade.setNavigation(navigation);
      })
    ).subscribe();
  }

  override onNavigation(): Observable<'estates' | 'owners' | 'lodgers'> {
    return this.facade.onNavigation();
  }

  override onDisplayComponents(): Observable<string[]> {
    return this.facade.onDisplayComponents() as Observable<string[]>;
  }
}
