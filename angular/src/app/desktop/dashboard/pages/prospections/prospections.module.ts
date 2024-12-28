import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProspectionsEffects } from 'src/app/core/store/prospections.effects';
import { prospectionReducer } from 'src/app/core/store/prospections.reducer';
import { ProspectionsDesktopComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [ProspectionsDesktopComponent],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    StoreModule.forFeature('prospections', prospectionReducer),
    EffectsModule.forFeature(ProspectionsEffects),
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzInputNumberModule,
    NzIconModule
  ]
})
export class ProspectionsModule { }
