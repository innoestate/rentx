import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { RentsModule } from "src/app/core/modules/rents.module";
import { loadEstates } from "src/app/core/store/estate/estates.actions";
import { EstatesEffects } from "src/app/core/store/estate/estates.effects";
import { estatesReducer } from "src/app/core/store/estate/estates.reducers";
import { OwnersDataModule } from "src/app/owners/data/owners.data.module";
import { LodgersDataModule } from "src/app/lodgers/data/lodgers.data.module";
import { EstatesDataService } from "./esates.data.service";

@NgModule({
  imports: [
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    OwnersDataModule,
    LodgersDataModule,
    RentsModule,
  ],
  providers: [
    EstatesDataService,
  ]
})
export class EstatesDataModule {
  constructor(private store: Store) {
    this.store.dispatch(loadEstates());
  }
}
