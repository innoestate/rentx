import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataNgrxService } from 'src/app/shared/data/ngrx/data.ngrx.service';
import * as AiActions from '../ngrx/ai.actions';
import { selectTokens, selectInvestorProfile, selectActive, selectTarget } from '../ngrx/ai.selectors';
import { Target } from '../ngrx/ai.reducers';

interface BuildInvestorProfileResponse {
  iaPrompt: string;
  fields: Record<string, any>;
}

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

  buildInvestorProfile(prompt: string): Observable<BuildInvestorProfileResponse> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      AiActions.buildInvestorProfile,
      AiActions.buildInvestorProfileSuccess,
      AiActions.buildInvestorProfileFailure,
      { prompt }
    );
  }
}
