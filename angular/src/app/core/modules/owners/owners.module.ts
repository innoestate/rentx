import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { OwnersEffects } from '../../store/owner/owners.effects';
import { ownersReducer } from '../../store/owner/owners.reducers';
import { loadOwners } from '../../store/owner/owners.actions';



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
    this.store.dispatch(loadOwners());
  }
}
