import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

export const loadMonthlyRents = createAction('[Rents] Load Monthly Rents');
export const loadMonthlyRentsSuccess = createAction('[Rents] Load Monthly Rents Success', props<{ monthlyRents: any }>());
export const loadMonthlyRentsFailure = createAction('[Rents] Load Monthly Rents Failure', props<{ error: HttpErrorResponse }>());
