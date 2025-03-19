import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { loadMonthlyRents, loadMonthlyRentsFailure, loadMonthlyRentsSuccess } from "src/app/rents/data/ngrx/rents.actions";
import { EstateRents } from "../../models/estate.rents.model";
import { Store } from "@ngrx/store";
import { selectMonthlyRents } from "../ngrx/rents.selectors";

@Injectable({ providedIn: 'root' })
export class RentsDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadMonthlyRents(): Observable<EstateRents[]> {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx<EstateRents[]>(loadMonthlyRents, loadMonthlyRentsSuccess, loadMonthlyRentsFailure, {});
  }

  get(){
    return this.store.selectSignal(this.store.selectSignal(selectMonthlyRents))
  }

}
