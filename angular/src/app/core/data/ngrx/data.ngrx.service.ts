import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, race, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataNgrxService {

  constructor(private store: Store, private actions$: Actions) { }

  updateObjectInNgrx<T>(actionToDispatch: any, successAction: any, failAction: any, objectToUpdate: any): Observable<T> {
    const successObservable = this.actions$.pipe(
      ofType(successAction),
      take(1)
    );
    const failObservable = this.actions$.pipe(
      ofType(failAction),
      take(1)
    );
    this.store.dispatch(actionToDispatch(objectToUpdate));
    return race(successObservable, failObservable);
  }


}
