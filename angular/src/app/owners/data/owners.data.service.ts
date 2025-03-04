import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectOwners } from "../../core/store/owner/owners.selectors";
import { deleteOwner, loadOwners as loadOwnersAction } from "src/app/core/store/owner/owners.actions";
import { Owner } from "src/app/core/models/owner.model";

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

  deleteOwner(ownerId: string) {
    this.store.dispatch(deleteOwner({ ownerId }));
  }

}
