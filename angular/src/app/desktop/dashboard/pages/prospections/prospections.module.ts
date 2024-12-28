import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProspectionsDesktopComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { StoreModule } from '@ngrx/store';
import { prospectionReducer } from 'src/app/core/store/prospections.reducer';
import { ProspectionsEffects } from 'src/app/core/store/prospections.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [ProspectionsDesktopComponent],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    StoreModule.forFeature('prospections', prospectionReducer),
    EffectsModule.forFeature(ProspectionsEffects),
  ]
})
export class ProspectionsModule { }
