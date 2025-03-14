import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, Observable } from "rxjs";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { Estate_Post_Request } from "src/app/estates/models/estate-post-request.model";
import { Estate } from "../../models/estate.model";
import { EstatesDataMessagesService } from "../messages/estates.messages.service";
import { createEstate, createEstateFailure, createEstateSuccess, deleteEstate, editEstateFailure, editEstateSuccess, loadEstates, editEstate as updateEstateInNgrx } from "../ngrx/estates.actions";
import { estatesSelector, selectEstates } from "../ngrx/estates.selectors";

@Injectable({
  providedIn: 'root',
})
export class EstatesDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private estatesMessagesService: EstatesDataMessagesService) {
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
    return this.dataNgrxService.updateObjectInNgrx<Estate>(updateEstateInNgrx, editEstateSuccess, editEstateFailure, {estate});
  }

  removeEstate(estateId: string){
    if(!estateId) throw new Error('Estate id is required');
    return this.store.dispatch(deleteEstate({ estateId }));
  }

  remove(estateId: string){
    this.store.dispatch(deleteEstate({ estateId }));
  }

}
