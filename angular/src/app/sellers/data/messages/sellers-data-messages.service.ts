import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/core/data/message/data.message.service";
import { createSellerFailure, createSellerSuccess, loadSellersFailure, removeSellerFailure, removeSellerSuccess, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";

@Injectable({
  providedIn: 'root'
})
export class SellersDataMessagesService extends DataMessagesService{

  override displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadSellersFailure, 'Echec de chargement des vendeurs!');

    this.displaySuccessMessageOnAction(createSellerSuccess, 'Vendeur ajouté avec succès!');
    this.displayFailureMessageOnAction(createSellerFailure, 'Echec de l\'ajout du vendeur!');

    this.displaySuccessMessageOnAction(updateSellerSuccess, 'Vendeur modifié avec succès!');
    this.displayFailureMessageOnAction(updateSellerFailure, 'Echec de la modification du vendeur!');

    this.displaySuccessMessageOnAction(removeSellerSuccess, 'Vendeur supprimé avec succès!');
    this.displayFailureMessageOnAction(removeSellerFailure, 'Echec de la suppression du vendeur!');
  }

}