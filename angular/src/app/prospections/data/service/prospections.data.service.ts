import { Injectable, Signal } from "@angular/core";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { createProspectionFailure, createProspectionSuccess, reloadProspection, deleteProspection, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";
import { createProspection, deleteProspectionFailure, deleteProspectionSuccess, updateProspection } from "../ngrx/prospections.actions";
import { loadProspectionsFailure, loadProspections as loadProspectionsOnNgrx, loadProspectionsSuccess } from "../ngrx/prospections.actions";
import { Store } from "@ngrx/store";
import { selectProspections } from "../ngrx/prospections.selectors";
import { Observable, tap } from "rxjs";
import { Prospection_Dto } from "../../models/prospection.dto.model";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadProspections(): Observable<Prospection_Dto[]> {
    return this.dataNgrxService.updateObjectInNgrx(loadProspectionsOnNgrx, loadProspectionsSuccess, loadProspectionsFailure, {});
  }

  createProspection(prospection: Prospection_Dto): Observable<Prospection_Dto> {
    return this.dataNgrxService.updateObjectInNgrx(createProspection, createProspectionSuccess, createProspectionFailure, { prospection });
  }

  updateProspection(prospection: Partial<Prospection_Dto>): any {
    return this.dataNgrxService.updateObjectInNgrx(updateProspection, updateProspectionSuccess, updateProspectionFailure, { prospection });
  }

  deleteProspection(id: string): Observable<void> {
    return this.dataNgrxService.updateObjectInNgrx(deleteProspection, deleteProspectionSuccess, deleteProspectionFailure, { id });
  }

  getProspections(): Signal<Prospection_Dto[]> {
    return this.store.selectSignal(selectProspections);
  }

  reloadProspection(prospectionId: string) {//use other method to not dispatch a success that is not (and display wrong message)
    return this.store.dispatch(reloadProspection({ prospectionId }));
  }

}
