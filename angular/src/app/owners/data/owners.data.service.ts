import { Injectable, Signal } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, Observable, of, race, take, tap } from "rxjs";
import { Owner } from "src/app/owners/models/owner.model";
import { createOwner as CreateOwnerOnNgrx, createOwnerFailure, createOwnerSuccess, deleteOwner, loadOwners as loadOwnersAction, updateOwner, updateOwnerFailure, updateOwnerSuccess } from "./ngrx/owners.actions";
import { selectOwners } from "./ngrx/owners.selectors";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { Owner_Post_Request } from "src/app/owners/models/owner-post-request.model";

@Injectable({
  providedIn: 'root',
})
export class OwnersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private actions$: Actions) { }

  loadOwners() {
    this.store.dispatch(loadOwnersAction());
  }

  createOwner(owner: Owner_Post_Request): Observable<Owner> {
    return this.dataNgrxService.updateObjectInNgrx<Owner>(CreateOwnerOnNgrx, createOwnerSuccess, createOwnerFailure, { owner });
  }

  getOwners(): Signal<Owner[]> {
    return this.store.selectSignal(selectOwners);
  }

  updateOwner(ownerData: Partial<Owner>): Observable<Owner> {
    return this.dataNgrxService.updateObjectInNgrx<Owner>(updateOwner, updateOwnerSuccess, updateOwnerFailure, { owner: ownerData });
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
