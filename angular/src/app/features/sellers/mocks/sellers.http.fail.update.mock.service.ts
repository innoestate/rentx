import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { sellerMock1, sellerMock2, sellerMock3 } from "./sellers.dto.mock";

@Injectable({
  providedIn: 'root'
})
export class SellerHttpFailUpdateMockService {

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
    return of(seller).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to update seller');
      })
    )
  }

  delete(id: string): Observable<void> {
    const index = this.mockSellers.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockSellers.splice(index, 1);
    }
    return of(void 0);
  }
}
