import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { OffresDataMessagesService } from "../messages/offers.messages.service";
import { OffersDataEffects } from "../data/ngrx/offers.data.effects";
import { offersDataReducer } from "../data/ngrx/offers.data.reducers";
import { OffersPdfEffects } from "../pdf/ngrx/offers.pdf.effects";

@NgModule({
  imports: [
    StoreModule.forFeature('offers', offersDataReducer),
    EffectsModule.forFeature([OffersDataEffects, OffersPdfEffects]),
  ]
})
export class OffersDataModule {
  constructor(offersMessage: OffresDataMessagesService) {}
}
