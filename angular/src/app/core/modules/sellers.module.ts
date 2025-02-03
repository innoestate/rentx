import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SellerEffects } from '../store/sellers/sellers.effects';
import { loadSellers } from '../store/sellers/sellers.actions';
import { sellersReducer } from '../store/sellers/sellers.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('sellers', sellersReducer),
    EffectsModule.forFeature(SellerEffects),
  ]
})
export class SellersModule {
  constructor(private store: Store) {
    this.store.dispatch(loadSellers());
  }
}

