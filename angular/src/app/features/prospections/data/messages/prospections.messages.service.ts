import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { createProspectionFailure, createProspectionSuccess, loadProspectionsFailure, deleteProspectionFailure, deleteProspectionSuccess, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";


@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataMessagesService extends DataMessagesService {

  override displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadProspectionsFailure, this.localizationService.getLocalization('prospections', 'failLoading'));

    this.displaySuccessMessageOnAction(createProspectionSuccess, this.localizationService.getLocalization('prospections', 'addProspectionSuccess'));
    this.displayFailureMessageOnAction(createProspectionFailure, this.localizationService.getLocalization('prospections', 'addProspectionFailure'));

    this.displaySuccessMessageOnAction(updateProspectionSuccess, this.localizationService.getLocalization('prospections', 'updateProspectionSuccess'));
    this.displayFailureMessageOnAction(updateProspectionFailure, this.localizationService.getLocalization('prospections', 'updateProspectionFailure'));

    this.displaySuccessMessageOnAction(deleteProspectionSuccess, this.localizationService.getLocalization('prospections', 'deleteProspectionSuccess'));
    this.displayFailureMessageOnAction(deleteProspectionFailure, this.localizationService.getLocalization('prospections', 'deleteProspectionFailure'));
  }

}
