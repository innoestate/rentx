import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/core/data/message/data.message.service";
import { createEstateFailure, createEstateSuccess, deleteEstateFailure, deleteEstateSuccess, editEstateFailure, editEstateSuccess, loadEstatesFailure } from "../ngrx/estates.actions";

@Injectable({
  providedIn: 'root'
})
export class EstatesDataMessagesService extends DataMessagesService{

  override displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadEstatesFailure, 'Echec de chargement des biens!');

    this.displaySuccessMessageOnAction(createEstateSuccess, 'Bien ajouté avec succès!');
    this.displayFailureMessageOnAction(createEstateFailure, 'Echec de l\'ajout du bien!');

    this.displaySuccessMessageOnAction(editEstateSuccess, 'Bien modifié avec succès!');
    this.displayFailureMessageOnAction(editEstateFailure, 'Echec de la modification du bien!');

    this.displaySuccessMessageOnAction(deleteEstateSuccess, 'Bien supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteEstateFailure, 'Echec de la suppression du bien!');
  }

}
