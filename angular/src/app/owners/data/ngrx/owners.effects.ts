import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { OwnersHttpService } from "../http/owners.http.service";
import { createOwner, createOwnerFailure, createOwnerSuccess, loadOwners, updateOwnerSuccess } from "./owners.actions";
import { selectOwners } from "./owners.selectors";

@Injectable()
export class OwnersEffects {

  constructor(private actions$: Actions, private ownerService: OwnersHttpService, private store: Store) { }

  loadOwners$ = createEffect(() => this.actions$.pipe(
    ofType(loadOwners),
    withLatestFrom(this.store.select(selectOwners)),
    map(([_, owners]) => owners),
    switchMap(actualOwners => {
      if (actualOwners && actualOwners.length > 0) {
        return of({ type: '[Owners] Load Owners Success', owners: actualOwners });
      } else {
        return this.ownerService.get().pipe(
          map(owners => ({ type: '[Owners] Load Owners Success', owners })),
          catchError(() => of({ type: '[Owners] Load Owners Failure' })))
      }
    }
    )))

  createOwner$ = createEffect(() => this.actions$.pipe(
    ofType(createOwner),
    switchMap(({ owner }) => this.ownerService.create(owner).pipe(
      map(data => (createOwnerSuccess({ owner: data }))),
      catchError(() => of(createOwnerFailure))
    ))
  ))

  updateOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Update Owner'),
    switchMap(({ owner }) => this.ownerService.edit(owner).pipe(
      map(data => (updateOwnerSuccess({ owner: data }))),
      catchError(() => of({ type: '[Owners] Update Owner Failure' }))
    ))
  ))

  deleteOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Delete Owner'),
    switchMap(data => this.ownerService.delete((data as any).ownerId).pipe(
      map(id => ({ type: '[Owners] Delete Owner Success', ownerId: id })),
      catchError(() => of({ type: '[Owners] Delete Owner Failure' }))
    ))
  ))

}
