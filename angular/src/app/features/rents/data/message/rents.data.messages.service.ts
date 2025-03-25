import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { loadMonthlyRentsFailure } from "../ngrx/rents.actions";

@Injectable({
  providedIn: 'root'
})
export class RentsDataMessagesService extends DataMessagesService {

  override displayAsyncMessages(): void {
    this.displayFailureMessageOnAction(loadMonthlyRentsFailure, 'echec de chargement des rentes mensuelles.');
  }

}
