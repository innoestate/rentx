import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectOwners } from "../../core/store/owner/owners.selectors";
import { loadOwners as loadOwnersAction } from "src/app/core/store/owner/owners.actions";

@Injectable({
  providedIn: 'root',
})
export class OwnersDataService {

  constructor(private store: Store) { }

  loadOwners(){
    this.store.dispatch(loadOwnersAction());
  }

  getOwners(){
    return this.store.selectSignal(selectOwners);
  }

}
