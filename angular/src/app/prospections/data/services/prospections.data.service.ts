import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { createProspection, createProspectionFailure, createProspectionSuccess, deleteProspection, deleteProspectionFailure, deleteProspectionSuccess, loadProspectionsFailure, loadProspections as loadProspectionsOnNgrx, loadProspectionsSuccess, reloadProspection, updateProspection, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";
import { selectProspections } from "../ngrx/prospections.selectors";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadProspections(): Observable<Prospection_Dto[]> {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(loadProspectionsOnNgrx, loadProspectionsSuccess, loadProspectionsFailure, {});
  }

  createProspection(prospection: Prospection_Dto): Observable<Prospection_Dto> {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(createProspection, createProspectionSuccess, createProspectionFailure, { prospection });
  }

  updateProspection(prospection: Partial<Prospection_Dto>): any {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(updateProspection, updateProspectionSuccess, updateProspectionFailure, { prospection });
  }

  deleteProspection(id: string): Observable<void> {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(deleteProspection, deleteProspectionSuccess, deleteProspectionFailure, { id });
  }

  getProspections(): Signal<Prospection_Dto[]> {
    return this.store.selectSignal(selectProspections);
  }

  reloadProspection(prospectionId: string) {
    return this.store.dispatch(reloadProspection({ prospectionId }));
  }

}
