import { Injectable, Signal } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, Observable, race, take } from "rxjs";
import { Owner } from "src/app/core/models/owner.model";
import { deleteOwner, loadOwners as loadOwnersAction, updateOwner, updateOwnerFailure, updateOwnerSuccess } from "./ngrx/owners.actions";
import { selectOwners } from "./ngrx/owners.selectors";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";

@Injectable({
  providedIn: 'root',
})
export class OwnersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private actions$: Actions) { }

  loadOwners() {
    this.store.dispatch(loadOwnersAction());
  }

  getOwners(): Signal<Owner[]> {
    return this.store.selectSignal(selectOwners);
  }

  updateOwner(ownerData: Partial<Owner>): Observable<Owner> {
    return this.dataNgrxService.updateObjectInNgrx(updateOwner, updateOwnerSuccess, updateOwnerFailure, {owner: ownerData});
  }

  deleteOwner(ownerId: string) {
    this.store.dispatch(deleteOwner({ ownerId }));
  }

}


export const updateObjectInNgrx = (store: Store, actions$: Actions, actionToDispatch: any, successAction: any, failAction: any, objectToUpdate: any) => {
  const ownerUpdateSuccess = actions$.pipe(
    ofType(successAction),
    take(1)
  );
  const ownerUpdateFail = actions$.pipe(
    ofType(successAction),
    take(1)
  );
  store.dispatch(actionToDispatch(objectToUpdate));
  return race(ownerUpdateSuccess, ownerUpdateFail).pipe(
    map(result => {
      if (result.type === updateOwnerSuccess.type) {
        return result.owner;
      }
      throw new Error('Update owner failed: ' + result as string);
    })
  )
}
