import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { createSeller, createSellerFailure, createSellerSuccess, loadSellers, loadSellersFailure, loadSellersSuccess, removeSeller, removeSellerFailure, removeSellerSuccess, updateSeller, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";
import { Seller_Dto } from "../../models/seller.dto.model";
import { selectAllSellers } from "../ngrx/sellers.selectors";

@Injectable({
  providedIn: 'root'
})
export class SellersDataService {

  constructor(private dataNgrxService: DataNgrxService, private store: Store) { }

  load() {
    return this.dataNgrxService.updateObjectInNgrx(loadSellers, loadSellersSuccess, loadSellersFailure, {});
  }

  create(seller: Seller_Dto) {
    return this.dataNgrxService.updateObjectInNgrx(createSeller, createSellerSuccess, createSellerFailure, { seller });
  }

  update(seller: Partial<Seller_Dto>) {
    this.dataNgrxService.updateObjectInNgrx(updateSeller, updateSellerSuccess, updateSellerFailure, seller);
  }

  delete(id: string) {
    this.dataNgrxService.updateObjectInNgrx(removeSeller, removeSellerSuccess, removeSellerFailure, { id });
  }

  get() {
    return this.store.selectSignal(selectAllSellers);
  }

}
