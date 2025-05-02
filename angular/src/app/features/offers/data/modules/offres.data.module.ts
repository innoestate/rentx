import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { OffresDataMessagesService } from "../messages/offers.messages.service";
import { OffersEffects } from "../ngrx/offers.effects";
import { offersReducer } from "../ngrx/offers.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature('offers', offersReducer),
    EffectsModule.forFeature(OffersEffects),
  ]
})
export class OffersDataModule {
  constructor(offersMessage: OffresDataMessagesService) {}
}
