import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prospection_Dto } from '../models/dtos/prospection.dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectionsHttpMockedService {
  private mockData: Prospection_Dto[] = [
    {
      id: '1',
      city: 'City 1',
      address: 'Address 1',
      link: 'Link 1',
      seller_id: '',
      user_id: 'User 1',
      price: 100,
      emission_date: new Date(),
      offer_id: 'Offer 1',
      construction_cost: 200,
      rents: [],
      resume: 'Resume 1',
      comment: 'Comment 1'
    }
  ];

  getAll(): Observable<any> {
    return of(this.mockData);
  }

  getById(id: string): Observable<any> {
    const item = this.mockData.find(data => data.id === id);
    return of(item);
  }

  create(data: any): Observable<any> {
    this.mockData.push(data);
    return of(data);
  }

  update(id: string, data: any): Observable<any> {
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...this.mockData[index], ...data };
    }
    return of(this.mockData[index]);
  }

  delete(id: string): Observable<any> {
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
    }
    return of({ success: index !== -1 });
  }
}
