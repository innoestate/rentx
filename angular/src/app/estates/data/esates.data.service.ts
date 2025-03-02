import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteEstate, editEstate, loadEstates } from "../../core/store/estate/estates.actions";
import { selectEstates } from "../../core/store/estate/estates.selectors";
import { Estate } from "src/app/core/models/estate.model";

@Injectable({
  providedIn: 'root',
})
export class EstatesDataService {

  constructor(private store: Store) { }

  loadEstates(){
    this.store.dispatch(loadEstates());
  }

  getEstates(){
    return this.store.selectSignal(selectEstates);
  }

  updateEstate(estate: Partial<Estate>){
    return this.store.dispatch(editEstate({ estate }));
  }

  remove(estateId: string){
    this.store.dispatch(deleteEstate({ estateId }));
  }

}
