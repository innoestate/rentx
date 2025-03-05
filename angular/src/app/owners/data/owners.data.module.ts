import { ModuleWithProviders, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { ownersReducer } from "src/app/owners/data/ngrx/owners.reducers";
import { OwnersDataService } from "./owners.data.service";
import { OwnersEffects } from "./ngrx/owners.effects";
import { loadOwners } from "./ngrx/owners.actions";

@NgModule({
  imports: [
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
  ],
  providers: [
    OwnersDataService
  ]
})
export class OwnersDataModule {
  constructor(private store: Store) {
    this.store.dispatch(loadOwners());
  }

  static forRoot(): ModuleWithProviders<OwnersDataModule> {
    return {
      ngModule: OwnersDataModule,
      providers: [
        OwnersDataService
      ]
    }
  }

  static forChild(): ModuleWithProviders<OwnersDataModule> {
    return {
      ngModule: OwnersDataModule,
      providers: []
    }
  }
}
