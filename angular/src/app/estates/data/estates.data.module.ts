import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { RentsModule } from "src/app/core/modules/rents.module";
import { loadEstates } from "src/app/core/store/estate/estates.actions";
import { EstatesEffects } from "src/app/core/store/estate/estates.effects";
import { estatesReducer } from "src/app/core/store/estate/estates.reducers";
import { LodgersDataModule } from "src/app/lodgers/data/lodgers.data.module";
import { EstatesDataService } from "./esates.data.service";
import { OwnersModule } from "src/app/owners/owners.module";

@NgModule({
  imports: [
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    LodgersDataModule,
    RentsModule,
    OwnersModule,
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
