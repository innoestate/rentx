import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, race, take, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataNgrxService {

  constructor(private store: Store, private actions$: Actions) { }

  dispatchWithFailOrSuccessActionsInNgrx<T>(actionToDispatch: any, successAction: any, failAction: any, objectToUpdate: any): Observable<T> {
    const successObservable = this.actions$.pipe(
      ofType(successAction),
      take(1)
    );
    const failObservable = this.actions$.pipe(
      ofType(failAction),
      take(1),
    );
    this.store.dispatch(actionToDispatch(objectToUpdate));
    return race(successObservable, failObservable).pipe(
      tap( result => {
        if((result as Action).type === failAction.type){
          throw new Error('Failed to update object in ngrx');
        }
      })
    )
  }


}
