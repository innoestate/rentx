import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seller_Dto } from '../../models/seller.dto.model';

@Injectable({
  providedIn: 'root'
})
export class SellersHttpService {

  private apiUrl = `${environment.apiURL}/prospections/sellers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Seller_Dto[]> {
    return this.http.get<Seller_Dto[]>(`${this.apiUrl}/all`);
  }

  getById(id: string): Observable<Seller_Dto> {
    return this.http.get<Seller_Dto>(`${this.apiUrl}/${id}`);
  }

  create(seller: Seller_Dto): Observable<Seller_Dto> {
    return this.http.post<Seller_Dto>(this.apiUrl, seller);
  }

  update(seller: Partial<Seller_Dto>): Observable<Partial<Seller_Dto>> {
    return this.http.patch<Seller_Dto>(`${this.apiUrl}/${seller.id}`, seller);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
