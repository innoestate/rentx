import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteEstate, editEstate, editEstateFailure, editEstateSuccess, loadEstates } from "./ngrx/estates.actions";
import { estatesSelector, selectEstates } from "./ngrx/estates.selectors";
import { Estate } from "../models/estate.model";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { editEstate as updateEstateInNgrx } from "./ngrx/estates.actions";

@Injectable({
  providedIn: 'root',
})
export class EstatesDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) {
    console.log('EstatesDataService constructor');
  }

  loadEstates(){
    this.store.dispatch(loadEstates());
  }

  getEstates() {
    return this.store.selectSignal(selectEstates);
  }

  updateEstate(estate: Partial<Estate>){
    return this.dataNgrxService.updateObjectInNgrx(updateEstateInNgrx, editEstateSuccess, editEstateFailure, {estate});
    // return this.store.dispatch(editEstate({ estate }));
  }

  removeEstate(estateId: string){
    if(!estateId) throw new Error('Estate id is required');
    return this.store.dispatch(deleteEstate({ estateId }));
  }

  remove(estateId: string){
    this.store.dispatch(deleteEstate({ estateId }));
  }

}
