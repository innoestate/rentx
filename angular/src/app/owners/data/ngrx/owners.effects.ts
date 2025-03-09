import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { OwnersHttpService } from "../http/owners.http.service";
import { createOwner, createOwnerFailure, createOwnerSuccess, deleteOwner, deleteOwnerFailure, deleteOwnerSuccess, loadOwners, loadOwnersFailure, loadOwnersSuccess, updateOwner, updateOwnerFailure, updateOwnerSuccess } from "./owners.actions";
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
        return of(loadOwnersSuccess({ owners: actualOwners }));
      } else {
        return this.ownerService.get().pipe(
          map(owners => (loadOwnersSuccess({ owners }))),
          catchError(err => of(loadOwnersFailure(err)))
        )
      }
    }
  )))

  createOwner$ = createEffect(() => this.actions$.pipe(
    ofType(createOwner),
    switchMap(({ owner }) => this.ownerService.create(owner).pipe(
      map(data => (createOwnerSuccess({ owner: data }))),
      catchError(err => of(createOwnerFailure(err)))
    ))
  ))

  updateOwner$ = createEffect(() => this.actions$.pipe(
    ofType(updateOwner),
    switchMap(({ owner }) => this.ownerService.edit(owner).pipe(
      map(data => (updateOwnerSuccess({ owner: data }))),
      catchError(err => of(updateOwnerFailure(err)))
    ))
  ))

  deleteOwner$ = createEffect(() => this.actions$.pipe(
    ofType(deleteOwner),
    switchMap(data => this.ownerService.delete((data as any).ownerId).pipe(
      map(id => (deleteOwnerSuccess({ ownerId: id })),
        catchError(err => of(deleteOwnerFailure(err)))
      )))
  ))

}
