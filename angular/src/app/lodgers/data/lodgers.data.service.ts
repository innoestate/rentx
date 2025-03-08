import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, Observable, of } from "rxjs";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { Lodger } from "src/app/core/models/lodger.model";
import { Lodger_Post } from "src/app/core/models/requests/lodger-post-request.model";
import { deleteLodger, loadLodgers, updateLodger as updateLodgerOnNgrx, updateLodgerFailure, updateLodgerSuccess, createLodger as createLodgerOnNgrx, createLodgerSuccess, createLodgerFailure} from "src/app/core/store/lodger/lodgers.actions";
import { selectLodgers } from "src/app/core/store/lodger/lodgers.selectors";

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
        console.error('Failed to create lodger with ngrx.', err);
        return of(err);
      })
    );
  }

  getLodgers() {
    return this.store.selectSignal(selectLodgers);
  }

  updateLodger(lodger: Partial<Lodger>): Observable<Lodger> {
    return this.dataNgrxService.updateObjectInNgrx<Lodger>(updateLodgerOnNgrx, updateLodgerSuccess, updateLodgerFailure, { lodger }).pipe(
      catchError(err => {
        console.error('Failed to update lodger with ngrx.', err);
        return of(err);
      })
    );
  }

  deleteLodger(lodgerId: string) {
    this.store.dispatch(deleteLodger({ lodgerId }));
  }

}
