import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { delay, Observable } from "rxjs";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { createProspection, createProspectionFailure, createProspectionSuccess, deleteProspection, deleteProspectionFailure, deleteProspectionSuccess, loadProspectionsFailure, loadProspections as loadProspectionsOnNgrx, loadProspectionsSuccess, reloadProspection, updateProspection, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";
import { selectProspections } from "../ngrx/prospections.selectors";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  loadProspections(): Observable<Prospection_Dto[]> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(loadProspectionsOnNgrx, loadProspectionsSuccess, loadProspectionsFailure, {});
  }

  createProspection(prospection: Partial<Prospection_Dto>): Observable<Prospection_Dto> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(createProspection, createProspectionSuccess, createProspectionFailure, { prospection });
  }

  updateProspection(id: string, prospection: Partial<Prospection_Dto>): any {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(updateProspection, updateProspectionSuccess, updateProspectionFailure, { prospection: {...prospection, id} });
  }

  deleteProspection(id: string): Observable<void> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(deleteProspection, deleteProspectionSuccess, deleteProspectionFailure, { id });
  }

  getProspections(): Signal<Prospection_Dto[] | undefined> {
    return toSignal(this.store.select(selectProspections).pipe(
    ));
  }

  reloadProspection(prospectionId: string) {
    return this.store.dispatch(reloadProspection({ prospectionId }));
  }

}
