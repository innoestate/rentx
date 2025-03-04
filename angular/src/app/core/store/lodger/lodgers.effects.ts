import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { LodgersService } from "../../services/lodgers.service";
import { loadOwnersFailure } from "../owner/owners.actions";
import { createLodger, createLodgerFailure, createLodgerSuccess, deleteLodger, deleteLodgerSuccess, loadLodgers, loadLodgersSuccess, updateLodger, updateLodgerFailure, updateLodgerSuccess } from "./lodgers.actions";
import { selectLodgers } from "./lodgers.selectors";
import { editEstate } from "../estate/estates.actions";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable()
export class LodgersEffects {

  constructor(private actions$: Actions, private lodgerService: LodgersService, private store: Store, private message: NzMessageService) { }

  loadOwners$ = createEffect(() => this.actions$.pipe(
    ofType(loadLodgers),
    withLatestFrom(this.store.select(selectLodgers)),
    map(([_, lodgers]) => lodgers),
    switchMap(actualLodgers => {
      if (actualLodgers && actualLodgers.length > 0) {
        return of(loadLodgersSuccess({ lodgers: actualLodgers }));
      } else {
        return this.lodgerService.read().pipe(
          map(lodgers => loadLodgersSuccess({ lodgers })),
          catchError(err => of(loadOwnersFailure(err)))
        )
      }
    }
    )))

  createLodger$ = createEffect(() => this.actions$.pipe(
    ofType(createLodger),
    switchMap(({ lodger, estateId }) => this.lodgerService.create(lodger).pipe(
      map(lodger => {
        if (estateId) {
          this.store.dispatch(editEstate({ estate: { id: estateId, lodger_id: lodger.id } }));
        }
        return createLodgerSuccess({ lodger })
      }),
      catchError(err => of(createLodgerFailure(err))
      ))
    )))

  createLodgerSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(createLodgerSuccess),
    tap(() => this.message.success('locataire ajouté avec succès!'))
  ), { dispatch: false })

  createLodgerFailure$ = createEffect(() => this.actions$.pipe(
    ofType(createLodgerFailure),
    tap(err => this.message.error((err.error.message)))
  ), { dispatch: false })

  updateLodger$ = createEffect(() => this.actions$.pipe(
    ofType(updateLodger),
    switchMap(frontLodgerData => this.lodgerService.update((frontLodgerData as any).lodger).pipe(
      map(() => updateLodgerSuccess({ lodger: (frontLodgerData as any).lodger })),
      catchError(err => of(updateLodgerFailure(err))
    ))
  )))

  deleteLodger$ = createEffect(() => this.actions$.pipe(
    ofType(deleteLodger),
    switchMap(data => this.lodgerService.delete((data as any).lodgerId).pipe(
      map(lodgerId => deleteLodgerSuccess({lodgerId})),
      catchError(() => of(deleteLodgerSuccess((data as any).ownerId)))
    ))
  ))

}
