import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { loadOwners } from "src/app/core/store/owner/owners.actions";
import { OwnersEffects } from "src/app/core/store/owner/owners.effects";
import { ownersReducer } from "src/app/core/store/owner/owners.reducers";
import { OwnersDataService } from "./owners.data.service";

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
}
