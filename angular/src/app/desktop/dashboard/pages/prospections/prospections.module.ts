import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProspectionsEffects } from 'src/app/core/store/prospections/prospections.effects';
import { prospectionReducer } from 'src/app/core/store/prospections/prospections.reducer';
import { ProspectionsDesktopComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SellersModule } from 'src/app/core/modules/sellers.module';
import { SellersCellComponent } from './sellers-cell/sellers-cell.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { OffersModule } from 'src/app/core/modules/offers.module';
import { UxModule } from 'src/app/ux/ux.module';

@NgModule({
  declarations: [ProspectionsDesktopComponent, SellersCellComponent],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    StoreModule.forFeature('prospections', prospectionReducer),
    EffectsModule.forFeature(ProspectionsEffects),
    SellersModule,
    OffersModule,
    UxModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzInputNumberLegacyModule,
    NzIconModule,
    NzDropDownModule,
    NzSelectModule,
    NzToolTipModule
  ],
  exports: [SellersCellComponent]
})
export class ProspectionsModule { }
