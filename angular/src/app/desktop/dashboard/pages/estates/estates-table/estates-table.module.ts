import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RentService } from 'src/app/common/services/rents.service';
import { LodgersModule } from 'src/app/core/modules/owners/lodgers.module';
import { OwnersModule } from 'src/app/core/modules/owners/owners.module';
import { RentsModule } from 'src/app/core/modules/rents.module';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { DevPopupService } from 'src/app/ui/popup/services/dev.popup.service';
import { UiPopupService } from 'src/app/ui/popup/services/popup.service';
import { UiModule } from 'src/app/ui/ui.module';
import { environment } from 'src/environments/environment';
import { EstateTableLodgerCellComponent } from '../estate-table-lodger-cell/estate-table-lodger-cell.component';
import { EstateTableOwnerCellComponent } from '../estate-table-owner-cell/estate-table-owner-cell.component';
import { EstatesTableComponent } from './estates-table.component';



@NgModule({
  declarations: [
    EstatesTableComponent,
    EstateTableOwnerCellComponent,
    EstateTableLodgerCellComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    UiModule,
    RouterModule.forChild([
      { path: '', component: EstatesTableComponent }
    ])
  ],
  providers: [
    RentService,
    { provide: UiPopupService, useClass: environment.production ? UiPopupService : DevPopupService },
  ]
})
export class EstatesTableModule { }
