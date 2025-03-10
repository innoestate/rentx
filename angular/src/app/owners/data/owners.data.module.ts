import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ownersReducer } from "src/app/owners/data/ngrx/owners.reducers";
import { OwnersDataMessagesService } from "./messages/owners.messages.service";
import { OwnersEffects } from "./ngrx/owners.effects";

@NgModule({
  imports: [
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
  ]
})
export class OwnersDataModule {
  constructor(private ownersMessagesService: OwnersDataMessagesService) {}
}
