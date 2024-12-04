import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatesMobilePageComponent } from './estates-page.component';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { StoreModule } from '@ngrx/store';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { RentsEffects } from 'src/app/core/store/rents/rents.effects';
import { OwnersModule } from 'src/app/core/modules/owners/owners.module';
import { LodgersModule } from 'src/app/core/modules/owners/lodgers.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [
    EstatesMobilePageComponent
  ],
  imports: [
    CommonModule,
    EstatesDesktopRoutingModule,
    OwnersModule,
    LodgersModule,
    NzModalModule,
    NzButtonModule,
    NzMenuModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects, RentsEffects),
  ]
})
export class EstatesPageModule { }
