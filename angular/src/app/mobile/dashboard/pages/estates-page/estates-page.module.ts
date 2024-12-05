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
import { OwnerItemComponent } from './owner-item/owner-item.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EstatesMobilePageComponent,
    OwnerItemComponent
  ],
  imports: [
    CommonModule,
    EstatesDesktopRoutingModule,
    OwnersModule,
    FormsModule,
    LodgersModule,
    NzModalModule,
    NzButtonModule,
    NzMenuModule,
    NzSelectModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects, RentsEffects),
  ],
  exports: [
    NzSelectModule
  ]
})
export class EstatesPageModule { }
