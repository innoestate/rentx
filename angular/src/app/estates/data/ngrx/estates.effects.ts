import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Estate_Dto } from "../../models/estate.dto.model";
import { EstatesHttpService } from "../http/estates.http.service";
import { deleteEstate, deleteEstateSuccess, editEstateSuccess, loadEstates, loadEstatesFailure, loadEstatesSuccess } from "./estates.actions";

@Injectable({
  providedIn: 'root'
})
export class EstatesEffects {

  constructor(private actions$: Actions, private estatesService: EstatesHttpService) {
    console.log('estates effect constructor')
  }

  loadEstates$ = createEffect(() => this.actions$.pipe(
    ofType(loadEstates),
    switchMap(() => this.estatesService.getEstates().pipe(
      map((estates) => (loadEstatesSuccess({ estates }))),
      catchError(err => of(loadEstatesFailure(err)))
    ))
  ))

  createEstate$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Create Estate'),
    switchMap(({ estate }) => this.estatesService.create(estate as Estate_Dto).pipe(
      map(editEstate => editEstateSuccess({ estate: editEstate})),
      catchError(({ error }) => of({ type: '[Estates] Create Estate Failure', error }))
    ))
  ))

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
