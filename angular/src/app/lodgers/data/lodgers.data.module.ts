import { ModuleWithProviders, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { LodgersDataService } from "./lodgers.data.service";
import { LodgersMessagesService } from "./messages/lodgers.messages.service";
import { lodgersReducer } from "./ngrx/lodgers.reducers";
import { LodgersEffects } from "./ngrx/lodgers.effects";
import { loadLodgers } from "./ngrx/lodgers.actions";

@NgModule({
  imports: [
    StoreModule.forFeature('lodgers', lodgersReducer),
    EffectsModule.forFeature(LodgersEffects),
  ],
  providers: [
    LodgersDataService
  ]
})
export class LodgersDataModule {
  constructor(private store: Store, lodgersMessagesService: LodgersMessagesService) {
    this.store.dispatch(loadLodgers());
  }

  static forRoot(): ModuleWithProviders<LodgersDataModule> {
    return {
      ngModule: LodgersDataModule,
      providers: [
        LodgersDataService
      ]
    };
  }

  static forChild(): ModuleWithProviders<LodgersDataModule> {
    return {
      ngModule: LodgersDataModule,
      providers: []
    };
  }
}
