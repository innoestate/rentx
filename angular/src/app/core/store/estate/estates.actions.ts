import { createAction, props } from "@ngrx/store";
import { Estate } from "../../models/estate.model";
import { Estate_Form } from "../../models/forms/estate-form.model";
import { Estate_Dto } from "../../models/dtos/estate.dto.model";
import { Estate_Post_Request } from "../../models/requests/estate-post-request.model";
import { HttpErrorResponse } from "@angular/common/http";

export const loadEstates = createAction('[Estates] Load Estates');
export const loadEstatesSuccess = createAction('[Estates] Load Estates Success', props<{ estates: any[] }>());
export const loadEstatesFailure = createAction('[Estates] Load Estates Failure', props<{ error: any }>());

export const createEstate = createAction('[Estates] Create Estate', props<{ estate: Estate_Post_Request }>());
export const createEstateSuccess = createAction('[Estates] Create Estate Success', props<{ estate: any }>());
export const createEstateFailure = createAction('[Estates] Create Estate Failure', props<{ error: HttpErrorResponse }>());

export const editEstate = createAction('[Estates] Edit Estate', props<{ estate: Partial<Estate> }>());
export const editEstateSuccess = createAction('[Estates] Edit Estate Success', props<{ estate: Estate }>());
export const editEstateFailure = createAction('[Estates] Edit Estate Failure', props<{ error: any }>());

export const deleteEstate = createAction('[Estates] Delete Estate', props<{ estateId: string }>());
export const deleteEstateSuccess = createAction('[Estates] Delete Estate Success', props<{ estateId: string }>());
export const deleteEstateFailure = createAction('[Estates] Delete Estate Failure', props<{ error: HttpErrorResponse }>());


