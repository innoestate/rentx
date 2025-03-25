import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { loadUserFailure, loadUserSuccess } from "../ngrx/user.actions";

@Injectable({
  providedIn: 'root'
})
export class UserDataMessagesService extends DataMessagesService{

  override displayAsyncMessages(){
    this.displaySuccessMessageOnAction(loadUserSuccess, "Authentification réussit");
    this.displayFailureMessageOnAction(loadUserFailure, "Echec de chargement de l'utilisateur");
  }

}
