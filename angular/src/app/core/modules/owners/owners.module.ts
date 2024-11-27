import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Actions, EffectsModule, ofType } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { OwnersEffects } from '../../store/owner/owners.effects';
import { ownersReducer } from '../../store/owner/owners.reducers';
import { loadOwners } from '../../store/owner/owners.actions';
import { loadUser, loadUserSuccess } from '../../store/user/user.actions';
import { take, tap } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
  ]
})
export class OwnersModule {
  constructor(private store: Store, private actions$: Actions) {
    this.loadOwners();
  }

  /**
   * this method make sort that owners are loaded after user is loaded successfully
   * useful for the first time a user logs in
   */
  private loadOwners() {
    this.actions$.pipe(
      ofType(loadUserSuccess),
      take(1),
      tap( _ => {
        this.store.dispatch(loadOwners());
      })
    ).subscribe();
  }
}

