import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { EstatesPageDesktopComponent } from './estates.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OwnersModule } from 'src/app/core/modules/owners/owners.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LodgersModule } from 'src/app/core/modules/owners/lodgers.module';
import { EstateTableOwnerCellComponent } from './estate-table-owner-cell/estate-table-owner-cell.component';
import { EstateTableLodgerCellComponent } from './estate-table-lodger-cell/estate-table-lodger-cell.component';


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
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzInputNumberModule,
    NzDropDownModule,
    NzIconModule
  ]
})
export class EstatesModule { }
