import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { loadUserFailure, loadUserSuccess, logOutSuccess } from "./user.actions";

export const userReducer = createReducer(
  initialUserState,
  on(loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(loadUserFailure, (state) => ({ ...state, user: null })),
  on(logOutSuccess, (state) => ({ ...state, user: null }))
)
