import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { loadLodgers } from '../../store/lodger/lodgers.actions';
import { LodgersEffects } from '../../store/lodger/lodgers.effects';
import { lodgersReducer } from '../../store/lodger/lodgers.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('lodgers', lodgersReducer),
    EffectsModule.forFeature(LodgersEffects),
  ]
})
export class LodgersModule {
  constructor(private store: Store, private actions$: Actions) {
    this.store.dispatch(loadLodgers());
  }
}

