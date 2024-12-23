import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { loadMonthlyRents } from '../store/rents/rents.actions';
import { RentsEffects } from '../store/rents/rents.effects';
import { rentsReducer } from '../store/rents/rents.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('rents', rentsReducer),
    EffectsModule.forFeature(RentsEffects),
  ]
})
export class RentsModule {
  constructor(private store: Store, private actions$: Actions) {
    this.store.dispatch(loadMonthlyRents());
  }
}

