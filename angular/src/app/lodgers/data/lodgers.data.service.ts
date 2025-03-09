import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, Observable, of } from "rxjs";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { Lodger } from "src/app/lodgers/models/lodger.model";
import { Lodger_Post } from "src/app/lodgers/models/lodger-post-request.model";
import { deleteLodger, loadLodgers, updateLodger as updateLodgerOnNgrx, updateLodgerFailure, updateLodgerSuccess, createLodger as createLodgerOnNgrx, createLodgerSuccess, createLodgerFailure} from "./ngrx/lodgers.actions";
import { selectLodgers } from "./ngrx/lodgers.selectors";

@Injectable({
  providedIn: 'root',
})
export class LodgersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadLodgers() {
    this.store.dispatch(loadLodgers());
  }

  createLodger(lodger: Lodger_Post): Observable<Lodger> {
    return this.dataNgrxService.updateObjectInNgrx<Lodger>(createLodgerOnNgrx, createLodgerSuccess, createLodgerFailure, { lodger }).pipe(
      catchError(err => {
        throw new Error('Failed to create lodger with ngrx.', err);
      })
    );
  }

  getLodgers() {
    return this.store.selectSignal(selectLodgers);
  }

  updateLodger(lodger: Partial<Lodger>): Observable<Lodger> {
    return this.dataNgrxService.updateObjectInNgrx<Lodger>(updateLodgerOnNgrx, updateLodgerSuccess, updateLodgerFailure, { lodger });
  }

  deleteLodger(lodgerId: string) {
    this.store.dispatch(deleteLodger({ lodgerId }));
  }

}
