import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataNgrxService } from 'src/app/shared/data/ngrx/data.ngrx.service';
import * as AiActions from '../ngrx/ai.actions';
import { selectTokens, selectInvestorProfile, selectActive, selectTarget } from '../ngrx/ai.selectors';
import { Target } from '../ngrx/ai.reducers';

@Injectable({
  providedIn: 'root'
})
export class AiFacadeService {
  constructor(
    private dataNgrxService: DataNgrxService,
    private store: Store
  ) { }

  getUserTokens(): Observable<{ tokens: number }> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      AiActions.getUserTokens,
      AiActions.getUserTokensSuccess,
      AiActions.getUserTokensFailure,
      {}
    );
  }

  getInvestorProfile(): Observable<{ profile: string[] }> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      AiActions.getInvestorProfile,
      AiActions.getInvestorProfileSuccess,
      AiActions.getInvestorProfileFailure,
      {}
    );
  }

  // Selectors as Signals
  getTokens(): Signal<number> {
    return this.store.selectSignal(selectTokens);
  }

  getActive(): Signal<boolean> {
    return this.store.selectSignal(selectActive);
  }

  getCurrentInvestorProfile(): Signal<string[]> {
    return this.store.selectSignal(selectInvestorProfile);
  }

  getTarget(): Signal<Target> {
    return this.store.selectSignal(selectTarget);
  }
}
