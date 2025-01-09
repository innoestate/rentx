import { Observable } from "rxjs";
import { Seller } from "../models/seller.model";
import { Injectable, Signal } from "@angular/core";
import { Prospection } from "../models/prospection.model";

@Injectable({
  providedIn: 'root'
})
export abstract class ProspectionFacade {

  constructor() { }

  abstract getSellers(): Signal<Seller[] | undefined>

  abstract setSeller(propsection: Prospection, seller: Seller): void

  abstract setSellerSuccess(): Signal<boolean | undefined>

  abstract setSellerFailure(): Signal<boolean | undefined>

}
