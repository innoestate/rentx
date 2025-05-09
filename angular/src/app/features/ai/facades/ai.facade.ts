import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataNgrxService } from 'src/app/shared/data/ngrx/data.ngrx.service';
import { InvestorProfileField } from '../models/investor-profile-field.interface';
import * as AiActions from '../ngrx/ai.actions';
import { selectActive, selectInvestorProfile, selectTokens } from '../ngrx/ai.selectors';

interface BuildInvestorProfileResponse {
  iaPrompt: string;
  fields: Record<string, any>;
}

interface BuildOfferResponse {
  result: string;
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

  getCurrentInvestorProfile(): Signal<InvestorProfileField[]> {
    return this.store.selectSignal(selectInvestorProfile);
  }

  buildInvestorProfile(prompt: string): Observable<BuildInvestorProfileResponse> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      AiActions.buildInvestorProfile,
      AiActions.buildInvestorProfileSuccess,
      AiActions.buildInvestorProfileFailure,
      { prompt }
    );
  }

  buildOffer(propsection_id: string, userPrompt: string): Observable<BuildOfferResponse> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(
      AiActions.buildOffer,
      AiActions.buildOfferSuccess,
      AiActions.buildOfferFailure,
      { propsection_id, userPrompt }
    );
  }
}
