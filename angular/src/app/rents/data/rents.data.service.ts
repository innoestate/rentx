import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadMonthlyRents } from "src/app/rents/data/ngrx/rents.actions";

@Injectable({ providedIn: 'root'})
export class RentsDataService {

  constructor(private store: Store) {}

  loadMonthlyRents() {
    this.store.dispatch(loadMonthlyRents());
  }


}
