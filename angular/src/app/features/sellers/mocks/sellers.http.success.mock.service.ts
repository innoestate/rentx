import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { sellerMock1, sellerMock2, sellerMock3 } from "./sellers.dto.mock";

@Injectable({
  providedIn: 'root'
})
export class SellerHttpSuccessMockService {

  private mockSellers: Seller_Dto[] = [
    sellerMock1,
    sellerMock2,
    sellerMock3
  ];

  getAll(): Observable<Seller_Dto[]> {
    return of(this.mockSellers);
  }

  create(seller: Seller_Dto): Observable<Seller_Dto> {
    const newSeller = {
      ...seller,
      id: `mock-id-${this.mockSellers.length + 1}`
    };
    this.mockSellers = [...this.mockSellers, newSeller];
    return of(newSeller);
  }

  update(id: string, seller: Partial<Seller_Dto>): Observable<Partial<Seller_Dto>> {
    const index = this.mockSellers.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockSellers = [...this.mockSellers];
      this.mockSellers[index] = {
        ...this.mockSellers[index],
        ...seller
      };
      return of(this.mockSellers[index]);
    }
    return of(seller);
  }

  delete(id: string): Observable<void> {
    const newMock: any[] = [];
    this.mockSellers.forEach(s => {
      if (s.id !== id) {
        newMock.push(s);
      }
    });
    this.mockSellers = newMock;
    return of(void 0);
  }
}
