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
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';


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
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzInputNumberModule,
  ]
})
export class EstatesModule { }
