import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { loadMonthlyRents, loadMonthlyRentsFailure, loadMonthlyRentsSuccess } from "src/app/rents/data/ngrx/rents.actions";
import { EstateRents } from "../models/estate.rents.model";

@Injectable({ providedIn: 'root' })
export class RentsDataService {

  constructor(private dataNgrxService: DataNgrxService) { }

  loadMonthlyRents(): Observable<EstateRents[]> {
    return this.dataNgrxService.updateObjectInNgrx<EstateRents[]>(loadMonthlyRents, loadMonthlyRentsSuccess, loadMonthlyRentsFailure, {});
  }

}
