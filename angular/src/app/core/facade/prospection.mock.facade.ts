import { Injectable, Signal } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, of } from "rxjs";
import { Prospection } from "../models/prospection.model";
import { Seller } from "../models/seller.model";
import { ProspectionFacade } from "./prospection.facade";

const sellers: Seller[] = [];

@Injectable({
  providedIn: 'root'
})
export class ProspectionMockedFacade extends ProspectionFacade {

  constructor() {
    super();
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
