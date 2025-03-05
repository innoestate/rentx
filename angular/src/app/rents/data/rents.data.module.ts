import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { rentsReducer } from "./ngrx/rents.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RentsEffects } from "./ngrx/rents.effects";
import { RentsDataService } from "./rents.data.service";

@NgModule({
  imports: [
    StoreModule.forFeature('rents', rentsReducer),
    EffectsModule.forFeature(RentsEffects)
  ],
})
export class RentsDataModule {

  static forRoot(): ModuleWithProviders<RentsDataModule> {
    return {
      ngModule: RentsDataModule,
      providers: [
        RentsDataService
      ]
    }
  }

  static forFeature(): ModuleWithProviders<RentsDataModule> {
    return {
      ngModule: RentsDataModule,
      providers: []
    }
  }

}
