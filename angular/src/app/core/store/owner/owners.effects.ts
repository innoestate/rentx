import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { OwnersService } from "../../services/owners.service";
import { selectOwners } from "./owners.selectors";

@Injectable()
export class OwnersEffects {

  constructor(private actions$: Actions, private ownerService: OwnersService, private store: Store) { }

  loadOwners$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Load Owners'),
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

  addOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Add Owner'),
    switchMap(({ owner }) => this.ownerService.create(owner).pipe(
      map(data => ({ type: '[Owners] Add Owner Success', owner: data })),
      catchError(() => of({ type: '[Owners] Load Owners Failure' }))
    ))
  ))

  updateOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Update Owner'),
    switchMap(({ owner }) => this.ownerService.edit(owner).pipe(
      map(data => ({ type: '[Owners] Update Owner Success', owner: data })),
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
