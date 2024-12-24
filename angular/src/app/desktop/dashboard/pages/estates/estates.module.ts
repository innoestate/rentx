import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
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
    NzInputNumberModule,
    NzDropDownModule,
    NzIconModule
  ]
})
export class EstatesModule { }
