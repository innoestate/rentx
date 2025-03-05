import { ModuleWithProviders, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RentsModule } from "src/app/core/modules/rents.module";
import { LodgersDataModule } from "src/app/lodgers/data/lodgers.data.module";
import { EstatesDataService } from "./esates.data.service";
import { EstatesEffects } from "./ngrx/estates.effects";
import { estatesReducer } from "./ngrx/estates.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    LodgersDataModule,
    RentsModule,
  ]
})
export class EstatesDataModule {
  constructor() {
    console.log('EstatesDataModule constructor');
  }

  static forRoot(): ModuleWithProviders<EstatesDataModule> {
    return {
      ngModule: EstatesDataModule,
      providers: [EstatesDataService]
    }
  }

  static forChild(): ModuleWithProviders<EstatesDataModule> {
    return {
      ngModule: EstatesDataModule,
      providers: []
    }
  }
}
