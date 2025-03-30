import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { createSeller, createSellerFailure, createSellerSuccess, loadSellers, loadSellersFailure, loadSellersSuccess, reloadSeller, removeSeller, removeSellerFailure, removeSellerSuccess, updateSeller, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";
import { Seller_Dto } from "../../models/seller.dto.model";
import { selectAllSellers } from "../ngrx/sellers.selectors";
import { SellersDataMessagesService } from "../messages/sellers.data.messages.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SellersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store, private sellersDataMessageService: SellersDataMessagesService) { }

  loadSellers() {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(loadSellers, loadSellersSuccess, loadSellersFailure, {});
  }

  createSeller(seller: Seller_Dto): Observable<Partial<Seller_Dto>> {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx<Partial<Seller_Dto>>(createSeller, createSellerSuccess, createSellerFailure, { seller });
  }

  updateSeller(id: string, seller: Partial<Seller_Dto>) {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(updateSeller, updateSellerSuccess, updateSellerFailure, { seller: {...seller, id} });
  }

  deleteSeller(id: string) {
    return this.dataNgrxService.dispatchWithFailOrSuccessActionsInNgrx(removeSeller, removeSellerSuccess, removeSellerFailure, { id });
  }

  getSellers() {
    return this.store.selectSignal(selectAllSellers);
  }

  reloadSeller(sellerId: string){
    return this.store.dispatch(reloadSeller({ sellerId }));
  }

}
