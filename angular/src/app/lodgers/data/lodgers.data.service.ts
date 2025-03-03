import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLodgers } from "src/app/core/store/lodger/lodgers.actions";
import { selectLodgers } from "src/app/core/store/lodger/lodgers.selectors";

@Injectable({
  providedIn: 'root',
})
export class LodgersDataService {

  constructor(private store: Store) { }

  loadLodgers(){
    this.store.dispatch(loadLodgers());
  }

  getLodgers(){
    return this.store.selectSignal(selectLodgers);
  }

}
