import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from "ng-zorro-antd/message";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Estate_Post_Request } from "../../models/requests/estate-post-request.model";
import { EstatesService } from "../../services/estates.service";
import { RentsHttpService } from "../../services/rents.http.service";
import { createEstateSuccess, deleteEstate, deleteEstateSuccess } from "./estates.actions";

@Injectable()
export class EstatesEffects {

  constructor(private actions$: Actions, private estatesService: EstatesService, private rentsService: RentsHttpService, private message: NzMessageService) { }

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
