import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AiHttpService } from './services/ai.http.service';
import { AiEffects } from './ngrx/ai.effects';
import { aiReducer } from './ngrx/ai.reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('ai', aiReducer),
    EffectsModule.forFeature([AiEffects])
  ],
  providers: [
    AiHttpService
  ]
})
export class AiModule { }
