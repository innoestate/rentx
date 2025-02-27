import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { LodgersModule } from "src/app/core/modules/owners/lodgers.module";
import { OwnersModule } from "src/app/core/modules/owners/owners.module";
import { RentsModule } from "src/app/core/modules/rents.module";
import { EstatesEffects } from "src/app/core/store/estate/estates.effects";
import { estatesReducer } from "src/app/core/store/estate/estates.reducers";
import { EstatesDataService } from "./esates.data.service";
import { loadEstates } from "src/app/core/store/estate/estates.actions";

@NgModule({
  imports: [
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    OwnersModule,
    LodgersModule,
    RentsModule,
  ],
  providers: [
    EstatesDataService
  ]
})
export class EstatesDataModule {
  constructor(private store: Store) {
    this.store.dispatch(loadEstates());
  }
}
