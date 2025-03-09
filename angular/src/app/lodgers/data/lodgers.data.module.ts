import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LodgersMessagesService } from "./messages/lodgers.messages.service";
import { LodgersEffects } from "./ngrx/lodgers.effects";
import { lodgersReducer } from "./ngrx/lodgers.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature('lodgers', lodgersReducer),
    EffectsModule.forFeature(LodgersEffects),
  ]
})
export class LodgersDataModule {
  constructor(lodgersMessagesService: LodgersMessagesService) {}
}
