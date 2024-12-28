import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerDTO } from '../models/dtos/seller.dto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerHttpService {

  private apiUrl = `${environment.apiURL}/prospections/sellers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SellerDTO[]> {
    return this.http.get<SellerDTO[]>(`${this.apiUrl}/all`);
  }

  getById(id: string): Observable<SellerDTO> {
    return this.http.get<SellerDTO>(`${this.apiUrl}/${id}`);
  }

  create(seller: SellerDTO): Observable<SellerDTO> {
    return this.http.post<SellerDTO>(this.apiUrl, seller);
  }

  update(id: string, seller: SellerDTO): Observable<SellerDTO> {
    return this.http.put<SellerDTO>(`${this.apiUrl}/${id}`, seller);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
