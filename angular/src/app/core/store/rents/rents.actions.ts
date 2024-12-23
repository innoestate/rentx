import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";


export const downloadRentReceipt = createAction('[Rents] Download Rent Receipt', props<{ estateId: string, startDate?: string, endDate?: string }>());
export const downloadRentReceiptSuccess = createAction('[Rents] Download Rent Receipt Success');
export const downloadRentReceiptFailure = createAction('[Rents] Download Rent Receipt Failure', props<{ error: HttpErrorResponse }>());

export const loadMonthlyRents = createAction('[Rents] Load Monthly Rents');
export const loadMonthlyRentsSuccess = createAction('[Rents] Load Monthly Rents Success', props<{ monthlyRents: any }>());
export const loadMonthlyRentsFailure = createAction('[Rents] Load Monthly Rents Failure', props<{ error: HttpErrorResponse }>());
