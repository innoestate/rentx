import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RentsEffects } from "./ngrx/rents.effects";
import { rentsReducer } from "./ngrx/rents.reducer";

@NgModule({
  imports: [
    StoreModule.forFeature('rents', rentsReducer),
    EffectsModule.forFeature(RentsEffects)
  ],
})
export class RentsDataModule {}
