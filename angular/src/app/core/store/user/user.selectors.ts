import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const userSelector = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  userSelector,
  (state: UserState) => state.user
);
