import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Estate } from "src/app/core/models/estate.model";
import { estate1Mock, estate2Mock } from "./estates.mock";

@Injectable({
  providedIn: 'root',
})
export class MockEstatesDataService {

  estates = new BehaviorSubject<Estate[]>([]);

  constructor() { }

  loadEstates() {
    this.estates.next([estate1Mock, estate2Mock]);
  }

  getEstates() {
    return this.estates.asObservable();
  }

  updateEstate(updatedEstate: Partial<Estate>) {
    const currentEstates = this.estates.getValue();
    const index = currentEstates.findIndex(e => e.id === updatedEstate.id);
    if (index > -1) {
      currentEstates[index] = { ...currentEstates[index], ...updatedEstate };
      this.estates.next([...currentEstates]);
    }
  }

  remove(estateId: string) {
    const updatedEstates = this.estates.getValue().filter(e => e.id !== estateId);
    this.estates.next(updatedEstates);
  }

}
