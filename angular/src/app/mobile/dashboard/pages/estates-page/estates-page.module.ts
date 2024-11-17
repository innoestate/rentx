import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatesMobilePageComponent } from './estates-page.component';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { StoreModule } from '@ngrx/store';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';

@NgModule({
  declarations: [
    EstatesMobilePageComponent
  ],
  imports: [
    CommonModule,
    EstatesDesktopRoutingModule,
    NzModalModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
  ]
})
export class EstatesPageModule { }
