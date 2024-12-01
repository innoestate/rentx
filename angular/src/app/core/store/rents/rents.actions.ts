import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";


export const downloadRentReceipt = createAction('[Rents] Download Rent Receipt', props<{ estateId: string, startDate?: string, endDate?: string }>());
export const downloadRentReceiptSuccess = createAction('[Rents] Download Rent Receipt Success');
export const downloadRentReceiptFailure = createAction('[Rents] Download Rent Receipt Failure', props<{ error: HttpErrorResponse }>());
