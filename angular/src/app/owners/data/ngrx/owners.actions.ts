import { createAction, props } from "@ngrx/store";
import { Owner } from "../../../core/models/owner.model";
import { Owner_Post_Request } from "../../../core/models/requests/owner-post-request.model";

export const loadOwners = createAction('[Owners] Load Owners');
export const loadOwnersSuccess = createAction('[Owners] Load Owners Success', props<{ owners: any[] }>());
export const loadOwnersFailure = createAction('[Owners] Load Owners Failure', props<{ error: any }>());

export const addOwner = createAction('[Owners] Add Owner', props<{ owner: Owner_Post_Request }>());
export const addOwnerSuccess = createAction('[Owners] Add Owner Success', props<{ owner: any }>());
export const addOwnerFailure = createAction('[Owners] Add Owner Failure', props<{ error: any }>());

export const updateOwner = createAction('[Owners] Update Owner', props<{ owner: Partial<Owner> }>());
export const updateOwnerSuccess = createAction('[Owners] Update Owner Success', props<{ owner: Owner }>());
export const updateOwnerFailure = createAction('[Owners] Update Owner Failure', props<{ error: string }>());

export const deleteOwner = createAction('[Owners] Delete Owner', props<{ ownerId: string }>());
export const deleteOwnerSuccess = createAction('[Owners] Delete Owner Success', props<{ ownerId: string }>());
export const deleteOwnerFailure = createAction('[Owners] Delete Owner Failure', props<{ error: any }>());
