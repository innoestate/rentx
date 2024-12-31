import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { OwnersService } from "../../services/owners.http.service";
import { selectOwners } from "./owners.selectors";
import { addOwnerFailure, addOwnerSuccess, loadOwners, updateOwnerSuccess } from "./owners.actions";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable()
export class OwnersEffects {

  constructor(private actions$: Actions, private ownerService: OwnersService, private store: Store, private message: NzMessageService) { }

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

  addOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Add Owner'),
    switchMap(({ owner }) => this.ownerService.create(owner).pipe(
      map(data => ({ type: '[Owners] Add Owner Success', owner: data })),
      catchError(() => of({ type: '[Owners] Load Owners Failure' }))
    ))
  ))

  addOwnerSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(addOwnerSuccess),
    tap(() => this.message.success('propriétaire ajouté avec succès!'))
  ), { dispatch: false })

  addOwnerFailure$ = createEffect(() => this.actions$.pipe(
    ofType(addOwnerFailure),
    tap(err  => this.message.error(err.error.message))
  ), { dispatch: false })

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
