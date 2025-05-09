import { createReducer, on } from '@ngrx/store';
import * as AiActions from './ai.actions';

export interface Target {
  url: string;
  params: { key: string; value: string }[];
}

export interface AiState {
  tokens: number;
  active: boolean;
  investorProfile: string[];
  target: Target;
}

export const initialState: AiState = {
  tokens: 0,
  active: false,
  investorProfile: [],
  target: {
    url: '',
    params: []
  }
};

export const aiReducer = createReducer(
  initialState,
  on(AiActions.getUserTokensSuccess, (state, { tokens }) => ({
    ...state,
    tokens
  })),
  on(AiActions.getInvestorProfileSuccess, (state, { profile }) => ({
    ...state,
    investorProfile: profile
  }))
);
