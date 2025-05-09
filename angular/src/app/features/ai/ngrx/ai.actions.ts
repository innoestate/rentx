import { createAction, props } from '@ngrx/store';
import { InvestorProfileField } from '../models/investor-profile-field.interface';

export const getUserTokens = createAction(
  '[AI] Get User Tokens',
);

export const getUserTokensSuccess = createAction(
  '[AI] Get User Tokens Success',
  props<{ tokens: number }>()
);

export const getUserTokensFailure = createAction(
  '[AI] Get User Tokens Failure',
  props<{ error: any }>()
);

export const getInvestorProfile = createAction(
  '[AI] Get Investor Profile',
);

export const getInvestorProfileSuccess = createAction(
  '[AI] Get Investor Profile Success',
  props<{ data: InvestorProfileField[] }>()
);

export const getInvestorProfileFailure = createAction(
  '[AI] Get Investor Profile Failure',
  props<{ error: any }>()
);

export const buildInvestorProfile = createAction(
  '[AI] Build Investor Profile',
  props<{ prompt: string }>()
);

export const buildInvestorProfileSuccess = createAction(
  '[AI] Build Investor Profile Success',
  props<{ iaPrompt: string; fields: Record<string, any> }>()
);

export const buildInvestorProfileFailure = createAction(
  '[AI] Build Investor Profile Failure',
  props<{ error: any }>()
);
