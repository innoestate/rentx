import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prospection_Dto } from '../models/dtos/prospection.dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectionsHttpMockedService {
  private mockData: Prospection_Dto[] = [];

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
