import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { createLodgerFailure, createLodgerSuccess, deleteLodgerFailure, deleteLodgerSuccess, loadLodgersFailure, updateLodgerFailure, updateLodgerSuccess } from "../ngrx/lodgers.actions";

@Injectable({
  providedIn: 'root'
})
export class LodgersDataMessagesService extends DataMessagesService {

  override displayAsyncMessages() {
    this.displayFailureMessageOnAction(loadLodgersFailure, 'Échec de chargement des locataires!');

    this.displaySuccessMessageOnAction(createLodgerSuccess, 'Locataire ajouté avec succès!');
    this.displayFailureMessageOnAction(createLodgerFailure, 'Échec de l\'ajout du locataire!');

    this.displaySuccessMessageOnAction(updateLodgerSuccess, 'Locataire mis à jour avec succès!');
    this.displayFailureMessageOnAction(updateLodgerFailure, 'Échec de la mise à jour du locataire!');

    this.displaySuccessMessageOnAction(deleteLodgerSuccess, 'Locataire supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteLodgerFailure, 'Échec de la suppression du locataire!');
  }

}
