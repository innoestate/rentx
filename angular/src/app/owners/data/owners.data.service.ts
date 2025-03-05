import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectOwners } from "./ngrx/owners.selectors";
import { Owner } from "src/app/core/models/owner.model";
import { deleteOwner, updateOwner, loadOwners as loadOwnersAction } from "./ngrx/owners.actions";

@Injectable({
  providedIn: 'root',
})
export class OwnersDataService {

  constructor(private store: Store) { }

  loadOwners(){
    this.store.dispatch(loadOwnersAction());
  }

  getOwners(): Signal<Owner[]> {
    return this.store.selectSignal(selectOwners);
  }

  updateOwner(ownerData: Partial<Owner>) {
    this.store.dispatch(updateOwner({ owner: ownerData }));
  }

  deleteOwner(ownerId: string) {
    this.store.dispatch(deleteOwner({ ownerId }));
  }

}
