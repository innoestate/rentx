import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { createOwnerFailure, createOwnerSuccess, deleteOwnerFailure, deleteOwnerSuccess, loadOwnersFailure, updateOwnerFailure, updateOwnerSuccess } from "./../ngrx/owners.actions";

@Injectable({
  providedIn: 'root'
})
export class OwnersDataMessagesService extends DataMessagesService {

  override displayAsyncMessages() {

    this.displayFailureMessageOnAction(loadOwnersFailure, 'Échec de la chargement des propriétaires!');

    this.displaySuccessMessageOnAction(createOwnerSuccess, 'Propriétaire ajouté avec succès!');
    this.displayFailureMessageOnAction(createOwnerFailure, 'Échec de l\'ajout du propriétaire!');

    this.displaySuccessMessageOnAction(updateOwnerSuccess, 'Propriétaire mis à jour avec succès!');
    this.displayFailureMessageOnAction(updateOwnerFailure, 'Échec de la mise à jour du propriétaire!');

    this.displaySuccessMessageOnAction(deleteOwnerSuccess, 'Propriétaire supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteOwnerFailure, 'Échec de la suppression du propriétaire!');
  }

}
