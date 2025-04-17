import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Estate_Dto } from "../../models/estate.dto.model";
import { EstatesHttpService } from "../http/estates.http.service";
import { createEstate, createEstateFailure, createEstateSuccess, deleteEstate, deleteEstateFailure, deleteEstateSuccess, editEstate, editEstateFailure, editEstateSuccess, loadEstates, loadEstatesFailure, loadEstatesSuccess } from "./estates.actions";

@Injectable({
  providedIn: 'root'
})
export class EstatesEffects {

  constructor(private actions$: Actions, private estatesService: EstatesHttpService) {
    // console.log('estates effect constructor')
  }

  loadEstates$ = createEffect(() => this.actions$.pipe(
    ofType(loadEstates),
    switchMap(() => this.estatesService.getEstates().pipe(
      map((estates) => (loadEstatesSuccess({ estates }))),
      catchError(err => of(loadEstatesFailure(err)))
    ))
  ))

  createEstate$ = createEffect(() => this.actions$.pipe(
    ofType(createEstate),
    switchMap(({ estate }) => this.estatesService.create(estate as Estate_Dto).pipe(
      map(editEstate => createEstateSuccess({ estate: editEstate})),
      catchError(({ error }) => of(createEstateFailure(error)))
    ))
  ))

  editEstate$ = createEffect(() => this.actions$.pipe(
    ofType(editEstate),
    switchMap(({ estate }) => this.estatesService.editEstate(estate).pipe(
      map(() => (editEstateSuccess({ estate }))),
      catchError(err => of(editEstateFailure(err)))
    ))
  ))

  deleteEstate$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEstate),
    switchMap(({ estateId }) => this.estatesService.deleteEstate(estateId).pipe(
      map(() => (deleteEstateSuccess({ estateId }))),
      catchError(err => of(deleteEstateFailure(err)))
    ))
  ))

}
