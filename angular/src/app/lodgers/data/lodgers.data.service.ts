import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { Lodger } from "src/app/core/models/lodger.model";
import { deleteLodger, loadLodgers, updateLodger, updateLodgerFailure, updateLodgerSuccess } from "src/app/core/store/lodger/lodgers.actions";
import { selectLodgers } from "src/app/core/store/lodger/lodgers.selectors";

@Injectable({
  providedIn: 'root',
})
export class LodgersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadLodgers(){
    this.store.dispatch(loadLodgers());
  }

  getLodgers(){
    return this.store.selectSignal(selectLodgers);
  }

  updateLodger(lodger: Partial<Lodger>) {
    return this.dataNgrxService.updateObjectInNgrx(updateLodger, updateLodgerSuccess, updateLodgerFailure, {lodger});
  }

  deleteLodger(lodgerId: string){
    this.store.dispatch(deleteLodger({lodgerId}));
  }

}
