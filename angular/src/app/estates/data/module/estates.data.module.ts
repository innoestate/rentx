import { ModuleWithProviders, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { EstatesDataMessagesService } from "../messages/estates.messages.service";
import { EstatesEffects } from "../ngrx/estates.effects";
import { estatesReducer } from "../ngrx/estates.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
  ]
})
export class EstatesDataModule {
  constructor(private messageService: EstatesDataMessagesService) { }
}
