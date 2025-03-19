import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { createSeller, createSellerFailure, createSellerSuccess, loadSellers, loadSellersFailure, loadSellersSuccess, removeSeller, removeSellerFailure, removeSellerSuccess, updateSeller, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";
import { Seller_Dto } from "../../models/seller.dto.model";
import { selectAllSellers } from "../ngrx/sellers.selectors";
import { SellersDataMessagesService } from "../messages/sellers-data-messages.service";

@Injectable({
  providedIn: 'root'
})
export class SellersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private sellersDataMessageService: SellersDataMessagesService) { }

  load() {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(loadSellers, loadSellersSuccess, loadSellersFailure, {});
  }

  create(seller: Seller_Dto) {
    return this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(createSeller, createSellerSuccess, createSellerFailure, { seller });
  }

  update(seller: Partial<Seller_Dto>) {
    this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(updateSeller, updateSellerSuccess, updateSellerFailure, seller);
  }

  delete(id: string) {
    this.dataNgrxService.DispatchWithFailOrSuccessActionsInNgrx(removeSeller, removeSellerSuccess, removeSellerFailure, { id });
  }

  get() {
    return this.store.selectSignal(selectAllSellers);
  }

}
