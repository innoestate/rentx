import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { loadOwners } from '../../../owners/data/ngrx/owners.actions';
import { OwnersEffects } from '../../../owners/data/ngrx/owners.effects';
import { ownersReducer } from '../../../owners/data/ngrx/owners.reducers';
import { userSelector } from '../../store/user/user.selectors';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
  ]
})
export class OwnersModule {

  constructor(private store: Store) {
    this.loadOwners();
  }

  /**
   * this method make sort that owners are loaded after user is loaded successfully
   * useful for the first time a user logs in
   */
  private loadOwners() {
    this.store.select(userSelector).pipe(
      take(1),
      tap( _ => this.store.dispatch(loadOwners()))
    ).subscribe();
  }
}

