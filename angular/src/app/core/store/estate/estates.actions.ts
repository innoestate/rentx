import { createAction, props } from "@ngrx/store";
import { Estate } from "../../models/estate.model";

export const loadEstates = createAction('[Estates] Load Estates');
export const loadEstatesSuccess = createAction('[Estates] Load Estates Success', props<{ estates: any[] }>());
export const loadEstatesFailure = createAction('[Estates] Load Estates Failure', props<{ error: any }>());

export const createEstate = createAction('[Estates] Create Estate', props<{ estate: any }>());
export const createEstateSuccess = createAction('[Estates] Create Estate Success', props<{ estate: any }>());
export const createEstateFailure = createAction('[Estates] Create Estate Failure', props<{ error: any }>());

export const deleteEstate = createAction('[Estates] Delete Estate');
export const deleteEstateSuccess = createAction('[Estates] Delete Estate Success', props<{ estate: Estate }>());
export const deleteEstateFailure = createAction('[Estates] Delete Estate Failure', props<{ error: any }>());

export const editEstate = createAction('[Estates] Edit Estate', props<{ estate: Estate }>());
export const editEstateSuccess = createAction('[Estates] Edit Estate Success', props<{ estate: Estate }>());
export const editEstateFailure = createAction('[Estates] Edit Estate Failure', props<{ error: any }>());
