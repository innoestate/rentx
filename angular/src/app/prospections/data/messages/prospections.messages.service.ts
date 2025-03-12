import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/core/data/message/data.message.service";
import { createProspectionFailure, createProspectionSuccess, loadProspectionsFailure, removeProspectionFailure, removeProspectionSuccess, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataMessagesService extends DataMessagesService{

  override displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadProspectionsFailure, 'Echec de chargement des prospections!');

    this.displaySuccessMessageOnAction(createProspectionSuccess, 'Prospection ajoutée avec succès!');
    this.displayFailureMessageOnAction(createProspectionFailure, 'Echec de l\'ajout de la prospection!');

    this.displaySuccessMessageOnAction(updateProspectionSuccess, 'Prospection modifiée avec succès!');
    this.displayFailureMessageOnAction(updateProspectionFailure, 'Echec de la modification de la prospection!');

    this.displaySuccessMessageOnAction(removeProspectionSuccess, 'Prospection supprimée avec succès!');
    this.displayFailureMessageOnAction(removeProspectionFailure, 'Echec de la suppression de la prospection!');
  }

}
