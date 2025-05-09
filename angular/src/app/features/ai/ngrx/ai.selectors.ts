import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AiState } from './ai.reducers';

export const selectAiState = createFeatureSelector<AiState>('ai');

export const selectTokens = createSelector(
  selectAiState,
  (state: AiState) => state.tokens
);

export const selectActive = createSelector(
  selectAiState,
  (state: AiState) => state.active
);

export const selectInvestorProfile = createSelector(
  selectAiState,
  (state: AiState) => state.investorProfile
);
