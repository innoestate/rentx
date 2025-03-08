import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from "ng-zorro-antd/message";
import { catchError, map, of, switchMap } from "rxjs";
import { RentsHttpService } from "../http/rents.http.service";
import { loadMonthlyRents, loadMonthlyRentsFailure, loadMonthlyRentsSuccess } from "./rents.actions";

@Injectable()
export class RentsEffects {

  constructor(private actions$: Actions, private rentsService: RentsHttpService, private message: NzMessageService) { }

  loadMonthlyRents$ = createEffect(() => this.actions$.pipe(
    ofType(loadMonthlyRents),
    switchMap(() => this.rentsService.fetchMonthlyRents().pipe(
      map((monthlyRents) => (loadMonthlyRentsSuccess({ monthlyRents }))),
      catchError(err => of(loadMonthlyRentsFailure(err)))
    ))
  ));

}
