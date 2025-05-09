import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AiHttpService } from './services/ai.http.service';
import { AiEffects } from './ngrx/ai.effects';
import { aiReducer } from './ngrx/ai.reducers';
import * as AiActions from './ngrx/ai.actions';

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
export class AiModule {
  constructor(private store: Store) {
    this.store.dispatch(AiActions.getUserTokens());
  }
}
