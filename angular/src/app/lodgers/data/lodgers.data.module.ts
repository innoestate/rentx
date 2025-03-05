import { ModuleWithProviders, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { LodgersEffects } from "src/app/core/store/lodger/lodgers.effects";
import { lodgersReducer } from "src/app/core/store/lodger/lodgers.reducers";
import { LodgersDataService } from "./lodgers.data.service";
import { loadLodgers } from "src/app/core/store/lodger/lodgers.actions";

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
  constructor(private store: Store) {
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
