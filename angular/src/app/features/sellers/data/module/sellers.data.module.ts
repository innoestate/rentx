import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { sellersReducer } from "../ngrx/sellers.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SellersEffects } from "../ngrx/sellers.effects";

@NgModule({
  imports: [
    StoreModule.forFeature('sellers', sellersReducer),
    EffectsModule.forFeature(SellersEffects)
  ]
})
export class SellersDataModule { }
