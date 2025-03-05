import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from "ng-zorro-antd/message";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Estate_Dto } from "../../models/estate.dto.model";
import { EstatesHttpService } from "../http/estates.http.service";
import { createEstateSuccess, deleteEstate, deleteEstateSuccess } from "./estates.actions";

@Injectable()
export class EstatesEffects {

  constructor(private actions$: Actions, private estatesService: EstatesHttpService, private message: NzMessageService) { }

  loadEstates$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Load Estates'),
    switchMap(() => this.estatesService.getEstates().pipe(
      map((estates) => ({ type: '[Estates] Load Estates Success', estates })),
      catchError(() => of({ type: '[Estates] Load Estates Failure' })))
    )))

  createEstate$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Create Estate'),
    switchMap(({ estate }) => this.estatesService.create(estate as Estate_Dto).pipe(
      map(createdEstate => ({ type: '[Estates] Create Estate Success', estate: createdEstate })),
      catchError(({ error }) => of({ type: '[Estates] Create Estate Failure', error }))
    ))
  ))

  createEstateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(createEstateSuccess),
    tap(() => {
      this.message.success('Bien ajouté avec succès!');
    })
  ), { dispatch: false })

  editEstate$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Edit Estate'),
    switchMap(({ estate }) => this.estatesService.editEstate(estate).pipe(
      map(() => ({ type: '[Estates] Edit Estate Success', estate })),
      catchError(() => of({ type: '[Estates] Edit Estate Failure' }))
    ))
  ))

  deleteEstate$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEstate),
    switchMap(({ estateId }) => this.estatesService.deleteEstate(estateId).pipe(
      map(() => (deleteEstateSuccess({ estateId }))),
      catchError(() => of({ type: '[Estates] Delete Estate Failure' }))
    ))
  ))

}
