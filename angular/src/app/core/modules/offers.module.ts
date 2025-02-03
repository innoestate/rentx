import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { loadOffers } from '../store/offers/offers.actions';
import { OffersEffects } from '../store/offers/offers.effects';
import { OffersReducer } from '../store/offers/offers.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('offers', OffersReducer),
    EffectsModule.forFeature(OffersEffects),
  ]
})
export class OffersModule {
  constructor(private store: Store) {
    this.store.dispatch(loadOffers());
  }
}

