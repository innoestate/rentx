import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure');

export const logOut = createAction('[User] Log Out');
export const logOutSuccess = createAction('[User] Log Out Success');
export const logOutFailure = createAction('[User] Log Out Failure');
