import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { offersReducer } from '../data/ngrx/offers.reducers';
import { OffersEffects } from '../data/ngrx/offers.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('offers', offersReducer),
        EffectsModule.forFeature([OffersEffects])
    ]
})
export class OffersModule { }
