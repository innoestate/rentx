import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { createOfferError, createOfferSuccess, deleteOfferError, deleteOfferSuccess, downloadOfferError, downloadOfferSuccess, loadProspectionOffersError, sendOfferByEmailError, sendOfferByEmailSuccess, updateOfferError, updateOfferSuccess } from "../ngrx/offers.actions";

@Injectable({
  providedIn: 'root'
})
export class OffresDataMessagesService extends DataMessagesService {

  override displayAsyncMessages() {
    this.displayFailureMessageOnAction(loadProspectionOffersError, 'Échec de chargement des offres!');

    this.displaySuccessMessageOnAction(createOfferSuccess, 'Offre ajouté avec succès!');
    this.displayFailureMessageOnAction(createOfferError, 'Échec de l\'ajout du l\'offre!');

    this.displaySuccessMessageOnAction(updateOfferSuccess, 'Offre mise à jour avec succès!');
    this.displayFailureMessageOnAction(updateOfferError, 'Échec de la mise à jour de l\'offre!');

    this.displaySuccessMessageOnAction(deleteOfferSuccess, 'Offre supprimée avec succès!');
    this.displayFailureMessageOnAction(deleteOfferError, 'Échec de la suppression de l\'offre!');

    this.displaySuccessMessageOnAction(sendOfferByEmailSuccess, 'Offre envoyée avec succès!');
    this.displayFailureMessageOnAction(sendOfferByEmailError, 'Échec de l\'envoi de l\'offre!');

    this.displaySuccessMessageOnAction(downloadOfferSuccess, 'Offre téléchargée avec succès!');
    this.displayFailureMessageOnAction(downloadOfferError, 'Échec du téléchargement de l\'offre!');
  }

}
