import { NgModule } from "@angular/core";
import { ProspectionsDataService } from "../services/prospections.data.service";
import { StoreModule } from "@ngrx/store";
import { prospectionReducer } from "../ngrx/prospections.reducers";
import { ProspectionsEffects } from "../ngrx/prospections.effects";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  imports: [
    StoreModule.forFeature('prospections', prospectionReducer),
    EffectsModule.forFeature(ProspectionsEffects)
  ],
  providers: [
    ProspectionsDataService
  ]
})
export class ProspectionsDataModule { }
