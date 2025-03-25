import { createAction, props } from "@ngrx/store";
import { Lodger_Dto } from "../../models/lodger.dto.model";
import { Lodger_Post } from "../../models/lodger-post-request.model";
import { Lodger } from "../../models/lodger.model";


export const loadLodgers = createAction('[Lodger] load Lodger');
export const loadLodgersSuccess = createAction('[Lodger] load Lodger Success', props<{ lodgers: Lodger_Dto[] }>());
export const loadLodgersFailure = createAction('[Lodger] load Lodger Failure', props<{ error: any }>());

export const createLodger = createAction('[Lodger] create Lodger', props<{ lodger: Lodger_Post, estateId?: string }>());
export const createLodgerSuccess = createAction('[Lodger] create Lodger Success', props<{ lodger: Lodger }>());
export const createLodgerFailure = createAction('[Lodger] create Lodger Failure', props<{ error: any }>());

export const updateLodger = createAction('[Lodger] Update Lodger', props<{ lodger: Partial<Lodger> }>());
export const updateLodgerSuccess = createAction('[Lodger] Update Lodger Success', props<{ lodger: Lodger }>());
export const updateLodgerFailure = createAction('[Lodger] Update Lodger Failure', props<{ error: any }>());

export const deleteLodger = createAction('[Lodger] Delete Lodger', props<{ lodgerId: string }>());
export const deleteLodgerSuccess = createAction('[Lodger] Delete Lodger Success', props<{ lodgerId: string }>());
export const deleteLodgerFailure = createAction('[Lodger] Delete Lodger Failure', props<{ error: any }>());
