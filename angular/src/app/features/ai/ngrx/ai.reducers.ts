import { createReducer, on } from '@ngrx/store';
import * as AiActions from './ai.actions';
import { InvestorProfileField } from '../models/investor-profile-field.interface';

export interface AiState {
  tokens: number;
  active: boolean;
  investorProfile: InvestorProfileField[];
}

export const initialState: AiState = {
  tokens: 0,
  active: false,
  investorProfile: []
};

export const aiReducer = createReducer(
  initialState,
  on(AiActions.getUserTokensSuccess, (state, { tokens }) => ({
    ...state,
    tokens,
    active: true
  })),
  on(AiActions.getUserTokensFailure, (state) => ({
    ...state,
    active: false
  })),
  on(AiActions.getInvestorProfileSuccess, (state, { data }) => ({
    ...state,
    investorProfile: data
  })),
  on(AiActions.buildInvestorProfileSuccess, (state, { fields }) => ({
    ...state,
    fields
  }))
);
