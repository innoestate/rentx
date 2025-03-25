import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { createSeller, createSellerFailure, createSellerSuccess, loadSellers, loadSellersFailure, loadSellersSuccess, removeSeller, removeSellerFailure, removeSellerSuccess, updateSeller, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";
import { Seller_Dto } from "../../models/seller.dto.model";
import { selectAllSellers } from "../ngrx/sellers.selectors";
import { SellersDataMessagesService } from "../messages/sellers.data.messages.service";

@Injectable({
  providedIn: 'root'
})
export class SellersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private sellersDataMessageService: SellersDataMessagesService) { }

  loadSellers() {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(loadSellers, loadSellersSuccess, loadSellersFailure, {});
  }

  createSeller(seller: Seller_Dto) {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(createSeller, createSellerSuccess, createSellerFailure, { seller });
  }

  updateSeller(seller: Partial<Seller_Dto>) {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(updateSeller, updateSellerSuccess, updateSellerFailure, seller);
  }

  deleteSeller(id: string) {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(removeSeller, removeSellerSuccess, removeSellerFailure, { id });
  }

  getSellers() {
    return this.store.selectSignal(selectAllSellers);
  }

}
