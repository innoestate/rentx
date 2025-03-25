import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sellersDtoMock } from '../../../mocks/sellers.dto.mock';
import { Seller_Dto } from 'src/app/features/sellers/models/seller.dto.model';

@Injectable({
  providedIn: 'root'
})
export class SellersHttpSuccessMockService {

  private mockSellers: Seller_Dto[] = sellersDtoMock;

  getAll(): Observable<Seller_Dto[]> {
    return of(this.mockSellers);
  }

  getById(id: string): Observable<Seller_Dto> {
    const seller = this.mockSellers.find(s => s.id === id);
    return of(seller!);
  }

  create(seller: Seller_Dto): Observable<Seller_Dto> {
    this.mockSellers.push(seller);
    return of(seller);
  }

  update(seller: Seller_Dto): Observable<Seller_Dto> {
    const index = this.mockSellers.findIndex(s => s.id === seller.id);
    if (index !== -1) {
      this.mockSellers[index] = seller;
    }
    return of(seller);
  }

  delete(id: string): Observable<void> {
    this.mockSellers = this.mockSellers.filter(s => s.id !== id);
    return of();
  }
}
