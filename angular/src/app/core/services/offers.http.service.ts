import { Injectable } from "@angular/core";
import { OfferDto } from "../models/offer.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OffersHttpService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<OfferDto[]> {
    return this.http.get<OfferDto[]>(`${environment.apiURL}/prospections/offers/get`);
  }

}
