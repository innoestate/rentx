import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from "ng-zorro-antd/message";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { EstatesService } from "../../services/estates.service";
import { RentsService } from "../../services/rents.service";
import { downloadRentReceipt, downloadRentReceiptFailure, downloadRentReceiptSuccess } from "./rents.actions";

@Injectable()
export class RentsEffects {

  constructor(private actions$: Actions, private rentsService: RentsService, private message: NzMessageService) { }

  downloadRentReceipt$ = createEffect(() => this.actions$.pipe(
    ofType(downloadRentReceipt),
    switchMap(({ estateId, startDate, endDate}) => this.rentsService.downloadRentReceipt(estateId, startDate, endDate).pipe(
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quittance.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }),
      map((estates) => (downloadRentReceiptSuccess())),
      catchError(err => of(downloadRentReceiptFailure(err)))
    ))))

}
