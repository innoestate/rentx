import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Lodger } from "src/app/core/models/lodger.model";
import { deleteLodger, loadLodgers, updateLodger } from "src/app/core/store/lodger/lodgers.actions";
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

  updateLodger(lodger: Partial<Lodger>) {
    this.store.dispatch(updateLodger({lodger}));
  }

  deleteLodger(lodgerId: string){
    this.store.dispatch(deleteLodger({lodgerId}));
  }

}
