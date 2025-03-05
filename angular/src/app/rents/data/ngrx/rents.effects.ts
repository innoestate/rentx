import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from "ng-zorro-antd/message";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { RentsHttpService } from "../http/rents.http.service";
import { downloadRentReceipt, downloadRentReceiptFailure, downloadRentReceiptSuccess, loadMonthlyRents, loadMonthlyRentsFailure, loadMonthlyRentsSuccess, senddRentReceipt, sendRentReceiptFailure, sendRentReceiptSuccess } from "./rents.actions";

@Injectable()
export class RentsEffects {

  constructor(private actions$: Actions, private rentsService: RentsHttpService, private message: NzMessageService) { }

  downloadRentReceipt$ = createEffect(() => this.actions$.pipe(
    ofType(downloadRentReceipt),
    switchMap(({ estateId, startDate, endDate }) => this.rentsService.downloadRentReceipt(estateId, startDate, endDate).pipe(
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quittance.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }),
      map(_ => (downloadRentReceiptSuccess())),
      catchError(err => of(downloadRentReceiptFailure(err)))
  ))))

  downloadRentReceiptSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(downloadRentReceiptSuccess),
    map(_ => loadMonthlyRents())
  ))

  sendRentReceipt$ = createEffect(() => this.actions$.pipe(
    ofType(senddRentReceipt),
    switchMap(({ estate, startDate, endDate }) => this.rentsService.sendRentReceipt(estate.id, startDate, endDate).pipe(
      map(estate => (sendRentReceiptSuccess({ estate }))),
      catchError(err => of(sendRentReceiptFailure(err)))
    ))
  ))

  sendRentReceiptSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(sendRentReceiptSuccess),
    tap(_ => this.message.success('Votre quittance a bien été envoyée.')),
    map(_ => loadMonthlyRents())
  ))

  sendRentReceiptFaillure$ = createEffect(() => this.actions$.pipe(
    ofType(sendRentReceiptFailure),
    tap(_ => this.message.error('Failed to send rent receipt'))
  ), { dispatch: false })

  loadMonthlyRents$ = createEffect(() => this.actions$.pipe(
    ofType(loadMonthlyRents),
    switchMap(() => this.rentsService.fetchMonthlyRents().pipe(
      map((monthlyRents) => (loadMonthlyRentsSuccess({ monthlyRents }))),
      catchError(err => of(loadMonthlyRentsFailure(err)))
    ))
  ));

}
