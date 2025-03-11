import { Directive } from "@angular/core";
import { SellersDataService } from "../data/service/sellers.data.service";

@Directive()
export class SellersTableDirective {

  sellers = this.sellersDataService.get();

  constructor(private sellersDataService: SellersDataService) { }



}
