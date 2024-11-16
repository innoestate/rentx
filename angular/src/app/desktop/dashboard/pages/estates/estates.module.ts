import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { EstatesPageDesktopComponent } from './estates.component';



@NgModule({
  declarations: [
    EstatesPageDesktopComponent
  ],
  imports: [
    CommonModule,
    EstatesDesktopRoutingModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
  ]
})
export class EstatesModule { }
