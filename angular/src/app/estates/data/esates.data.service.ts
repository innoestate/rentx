import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { createEstate, createEstateFailure, createEstateSuccess, deleteEstate, editEstate, editEstateFailure, editEstateSuccess, loadEstates } from "./ngrx/estates.actions";
import { estatesSelector, selectEstates } from "./ngrx/estates.selectors";
import { Estate } from "../models/estate.model";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { editEstate as updateEstateInNgrx } from "./ngrx/estates.actions";
import { catchError, Observable, of } from "rxjs";
import { Estate_Post_Request } from "src/app/estates/models/estate-post-request.model";

@Injectable({
  providedIn: 'root',
})
export class EstatesDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) {
    console.log('EstatesDataService constructor');
  }

  createEstate(estate: Estate_Post_Request){
    return this.dataNgrxService.updateObjectInNgrx<Estate>(createEstate, createEstateSuccess, createEstateFailure, {estate}).pipe(
      catchError(err => {
        throw new Error('Failed to create estate with ngrx.', err);
      })
    );
  }

  loadEstates(){
    this.store.dispatch(loadEstates());
  }

  getEstates() {
    return this.store.selectSignal(selectEstates);
  }

  updateEstate(estate: Partial<Estate>): Observable<Estate>{
    return this.dataNgrxService.updateObjectInNgrx<Estate>(updateEstateInNgrx, editEstateSuccess, editEstateFailure, {estate}).pipe(
      catchError(err => {
        throw new Error('Failed to update estate with ngrx.', err);
      })
    );
  }

  removeEstate(estateId: string){
    if(!estateId) throw new Error('Estate id is required');
    return this.store.dispatch(deleteEstate({ estateId }));
  }

  remove(estateId: string){
    this.store.dispatch(deleteEstate({ estateId }));
  }

}
