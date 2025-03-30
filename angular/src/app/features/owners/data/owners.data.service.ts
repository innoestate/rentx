import { Injectable, Signal } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, Observable, race, take } from "rxjs";
import { Owner_Post_Request } from "src/app/features/owners/models/owner-post-request.model";
import { Owner } from "src/app/features/owners/models/owner.model";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { createOwnerFailure, createOwner as CreateOwnerOnNgrx, createOwnerSuccess, deleteOwner, loadOwners as loadOwnersAction, updateOwner, updateOwnerFailure, updateOwnerSuccess } from "./ngrx/owners.actions";
import { selectOwners } from "./ngrx/owners.selectors";

@Injectable({
  providedIn: 'root',
})
export class OwnersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private actions$: Actions) { }

  loadOwners() {
    this.store.dispatch(loadOwnersAction());
  }

  createOwner(owner: Owner_Post_Request): Observable<Owner> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx<Owner>(CreateOwnerOnNgrx, createOwnerSuccess, createOwnerFailure, { owner });
  }

  getOwners(): Signal<Owner[]> {
    return this.store.selectSignal(selectOwners);
  }

  updateOwner(id: string, ownerData: Partial<Owner>): Observable<Owner> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx<Owner>(updateOwner, updateOwnerSuccess, updateOwnerFailure, { owner: {...ownerData, id} }).pipe();
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
