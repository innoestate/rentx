import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { LodgersService } from "../../services/lodgers.service";
import { loadOwnersFailure } from "../owner/owners.actions";
import { createLodger, createLodgerFailure, createLodgerSuccess, deleteLodger, deleteLodgerSuccess, loadLodgers, loadLodgersSuccess, updateLodger, updateLodgerFailure, updateLodgerSuccess } from "./lodgers.actions";
import { selectLodgers } from "./lodgers.selectors";
import { editEstate } from "../estate/estates.actions";

@Injectable()
export class LodgersEffects {

  constructor(private actions$: Actions, private lodgerService: LodgersService, private store: Store) { }

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

  updateLodger$ = createEffect(() => this.actions$.pipe(
    ofType(updateLodger),
    switchMap(data => this.lodgerService.update((data as any).lodger).pipe(
      map(lodger => updateLodgerSuccess({ lodger })),
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
