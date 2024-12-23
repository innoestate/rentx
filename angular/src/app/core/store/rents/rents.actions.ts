import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Estate } from "../../models/estate.model";


export const downloadRentReceipt = createAction('[Rents] Download Rent Receipt', props<{ estateId: string, startDate?: string, endDate?: string }>());
export const downloadRentReceiptSuccess = createAction('[Rents] Download Rent Receipt Success');
export const downloadRentReceiptFailure = createAction('[Rents] Download Rent Receipt Failure', props<{ error: HttpErrorResponse }>());

export const senddRentReceipt = createAction('[Rents] Send Rent Receipt', props<{ estate: Estate, startDate?: string, endDate?: string }>());
export const sendRentReceiptSuccess = createAction('[Rents] Send Rent Receipt Success', props<{ estate: Estate }>());
export const sendRentReceiptFailure = createAction('[Rents] Send Rent Receipt Failure', props<{ error: HttpErrorResponse }>());

export const loadMonthlyRents = createAction('[Rents] Load Monthly Rents');
export const loadMonthlyRentsSuccess = createAction('[Rents] Load Monthly Rents Success', props<{ monthlyRents: any }>());
export const loadMonthlyRentsFailure = createAction('[Rents] Load Monthly Rents Failure', props<{ error: HttpErrorResponse }>());
