import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { EstatesPageDesktopComponent } from './estates.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EstatesPageDesktopComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EstatesDesktopRoutingModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    NzModalModule
  ]
})
export class EstatesModule { }
