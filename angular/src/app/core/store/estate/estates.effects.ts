import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, combineLatest, map, of, switchMap, take, tap } from "rxjs";
import { EstatesService } from "../../services/estates.service";
import { Estate_Post_Request } from "../../models/requests/estate-post-request.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class EstatesEffects {

  constructor(private actions$: Actions, private estatesService: EstatesService, private store: Store) { }

  loadEstates$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Load Estates'),
    // tap(() => this.store.dispatch({ type: '[Owners] Load Owners' })),
    // tap(() => this.store.dispatch({ type: '[Lodgers] Load Lodgers' })),

    switchMap(() => this.estatesService.getEstates().pipe(
      map((estates) => ({ type: '[Estates] Load Estates Success', estates })),
      catchError(() => of({ type: '[Estates] Load Estates Failure' })))
    )))

  createEstate$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Create Estate'),
    switchMap(({ estate }) => this.estatesService.create(estate as Estate_Post_Request).pipe(
      // switchMap(createdEstate => combineLatest([of(createdEstate), this.store.select(ownersSelector).pipe(take(1))])),
      // map(([createdEstate, { owners }]) => setOwner(createdEstate, owners)),
      map(createdEstate => ({ type: '[Estates] Create Estate Success', estate: createdEstate })),
      catchError(({error}) => of({ type: '[Estates] Create Estate Failure', error }))
    ))
  ))

  // toogleEstateModal$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Estates] Toogle Create Estate Modal'),
  //   map(({ visible }) => ({ type: '[Estates] Toogle Create Estate Modal Success', visible })),
  //   catchError(() => of({ type: '[Estates] Toogle Create Estate Modal Failure' }))
  // ))

  // toogleSetLodgerModal$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Estates] Toogle Set Lodger Modal'),
  //   map(({ visible }) => ({ type: '[Estates] Toogle Set Lodger Modal Success', visible })),
  //   catchError(() => of({ type: '[Estates] Toogle Set Lodger Failure' }))
  // ))

  deleteEstate$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Delete Estate'),
    switchMap(({ estate }) => this.estatesService.deleteEstate(estate).pipe(
      map(() => ({ type: '[Estates] Delete Estate Success', estate })),
      catchError(() => of({ type: '[Estates] Delete Estate Failure' }))
    ))
  ))

  editEstate$ = createEffect(() => this.actions$.pipe(
    ofType('[Estates] Edit Estate'),
    switchMap(({ estate }) => this.estatesService.editEstate(estate).pipe(
      map(() => ({ type: '[Estates] Edit Estate Success', estate })),
      catchError(() => of({ type: '[Estates] Edit Estate Failure' }))
    ))
  ))

}
