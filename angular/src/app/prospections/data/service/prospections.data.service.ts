import { Injectable, Signal } from "@angular/core";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { createProspectionFailure, createProspectionSuccess, reloadProspection, removeProspection, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";
import { createProspection, removeProspectionFailure, removeProspectionSuccess, updateProspection } from "../ngrx/prospections.actions";
import { loadProspectionsFailure, loadProspections as loadProspectionsOnNgrx, loadProspectionsSuccess } from "../ngrx/prospections.actions";
import { Store } from "@ngrx/store";
import { selectProspections } from "../ngrx/prospections.selectors";
import { Observable } from "rxjs";
import { Prospection_Dto } from "../../models/prospection.dto.model";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadProspections(): Observable<Prospection_Dto[]> {
    return this.dataNgrxService.updateObjectInNgrx(loadProspectionsOnNgrx, loadProspectionsSuccess, loadProspectionsFailure, {});
  }

  createProspection(): Observable<Prospection_Dto> {
    return this.dataNgrxService.updateObjectInNgrx(createProspection, createProspectionSuccess, createProspectionFailure, {});
  }

  updateProspection(prospection: Partial<Prospection_Dto>): Observable<Partial<Prospection_Dto>> {
    return this.dataNgrxService.updateObjectInNgrx(updateProspection, updateProspectionSuccess, updateProspectionFailure, {prospection});
  }

  deleteProspection(id: string): Observable<void> {
    return this.dataNgrxService.updateObjectInNgrx(removeProspection, removeProspectionSuccess, removeProspectionFailure, { id });
  }

  getProspections(): Signal<Prospection_Dto[]> {
    return this.store.selectSignal(selectProspections);
  }

  reloadProspection(prospection: Prospection_Dto) {
    return this.store.dispatch(updateProspectionSuccess({ prospection }));
  }

}
