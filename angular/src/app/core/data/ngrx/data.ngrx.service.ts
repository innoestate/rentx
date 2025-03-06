import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { map, race, take } from "rxjs";
import { updateOwnerSuccess } from "src/app/owners/data/ngrx/owners.actions";

@Injectable({
  providedIn: 'root'
})
export class DataNgrxService {

  constructor(private store: Store, private actions$: Actions) { }

  updateObjectInNgrx(actionToDispatch: any, successAction: any, failAction: any, objectToUpdate: any){
    const successObservable = this.actions$.pipe(
      ofType(successAction),
      take(1)
    );
    const failObservable = this.actions$.pipe(
      ofType(failAction),
      take(1)
    );
    this.store.dispatch(actionToDispatch(objectToUpdate));
    return race(successObservable, failObservable).pipe(
      map(result => {
        if (result.type === updateOwnerSuccess.type) {
          return result.owner;
        }
        throw new Error('Update owner failed: ' + result as string);
      })
    )
  }


}
