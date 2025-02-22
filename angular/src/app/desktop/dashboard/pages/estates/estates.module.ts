import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { LodgersModule } from 'src/app/core/modules/owners/lodgers.module';
import { OwnersModule } from 'src/app/core/modules/owners/owners.module';
import { RentsModule } from 'src/app/core/modules/rents.module';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { EstateTableLodgerCellComponent } from './estate-table-lodger-cell/estate-table-lodger-cell.component';
import { EstateTableOwnerCellComponent } from './estate-table-owner-cell/estate-table-owner-cell.component';
import { EstatesPageDesktopComponent } from './estates.component';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { RentService } from 'src/app/common/services/rents.service';
import { UxModule } from 'src/app/ux/ux.module';
import { PopupService } from 'src/app/ux/popup/services/popup.service';
import { DevPopupService } from 'src/app/ux/popup/services/dev.popup.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    EstatesPageDesktopComponent,
    EstateTableOwnerCellComponent,
    EstateTableLodgerCellComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EstatesDesktopRoutingModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    OwnersModule,
    LodgersModule,
    RentsModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzInputNumberLegacyModule,
    NzDropDownModule,
    NzIconModule,
    UxModule,
  ],
  providers: [
    RentService,
    { provide: PopupService, useClass: environment.production ? PopupService : DevPopupService }
  ]
})
export class EstatesModule { }
