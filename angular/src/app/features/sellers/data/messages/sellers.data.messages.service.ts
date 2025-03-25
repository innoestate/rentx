import { Injectable } from "@angular/core";
import { DataMessagesService } from "src/app/shared/data/message/data.message.service";
import { createSellerFailure, createSellerSuccess, loadSellersFailure, removeSellerFailure, removeSellerSuccess, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";

@Injectable({
  providedIn: 'root'
})
export class SellersDataMessagesService extends DataMessagesService {

  override displayAsyncMessages() {

    this.displayFailureMessageOnAction(loadSellersFailure, this.localizationService.getLocalization('sellers', 'failLoading'));

    this.displaySuccessMessageOnAction(createSellerSuccess, this.localizationService.getLocalization('sellers', 'addSellerSuccess'));
    this.displayFailureMessageOnAction(createSellerFailure, this.localizationService.getLocalization('sellers', 'addSellerFailure'));

    this.displaySuccessMessageOnAction(updateSellerSuccess, this.localizationService.getLocalization('sellers', 'updateSellerSuccess'));
    this.displayFailureMessageOnAction(updateSellerFailure, this.localizationService.getLocalization('sellers', 'updateSellerFailure'));

    this.displaySuccessMessageOnAction(removeSellerSuccess, this.localizationService.getLocalization('sellers', 'deleteSellerSuccess'));
    this.displayFailureMessageOnAction(removeSellerFailure, this.localizationService.getLocalization('sellers', 'deleteSellerFailure'));
  }

}
