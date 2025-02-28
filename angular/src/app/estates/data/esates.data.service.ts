import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteEstate, loadEstates } from "../../core/store/estate/estates.actions";
import { selectEstates } from "../../core/store/estate/estates.selectors";

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

  remove(estateId: string){
    this.store.dispatch(deleteEstate({ estateId }));
  }

}
