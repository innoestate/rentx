import { Injectable, Signal } from "@angular/core";
import { Prospection } from "../models/prospection.model";
import { Seller } from "../models/seller.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class ProspectionFacade {

  constructor() { }

  abstract createSeller(seller: Seller): Signal<Seller | undefined>

  abstract getSellers(): Signal<Seller[] | undefined>

  // abstract updateSeller(seller: Seller): Observable<Seller | undefined>

  abstract setSeller(propsection: Prospection, seller: Seller): void

  abstract setSellerSuccess(): Signal<boolean | undefined>

  abstract setSellerFailure(): Signal<boolean | undefined>

}
