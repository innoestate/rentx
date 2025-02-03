import { Injectable, Signal } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, of } from "rxjs";
import { Prospection } from "../../models/prospection.model";
import { Seller } from "../../models/seller.model";
import { ProspectionFacade } from "../prospection.facade";

const sellers: Seller[] = [
  {
    id: '1',
    name: 'Test seller',
    email: 'jK2m3@example.com',
    phone: '1234567890'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProspectionOneMockedFacade extends ProspectionFacade {

  constructor() {
    super();
  }

  override createSeller(seller: Seller): Signal<Seller | undefined> {
    return toSignal(of(seller).pipe(
      delay(100)
    ));
  }

  getSellers(): Signal<Seller[] | undefined> {
    return toSignal(of(sellers));
  }

  setSeller(prospection: Prospection, seller: Seller) { }

  setSellerSuccess() {
    return toSignal(of(true).pipe(
      delay(100)
    ));
  }

  setSellerFailure() {
    return toSignal(of(true).pipe(
      delay(100000000),
      catchError(() => of(true)),
    ));

  }

}
