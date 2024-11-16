import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Estate_Dto } from '../../core/models/dtos/estate.dto.model';


@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  constructor(private http: HttpClient) { }

  getEstates(): Observable<Estate_Dto[]> {
    console.log('getEstates');
    return of([
      {
        id: '1',
        street: 'Address 1',
        zip: 'Zip 1',
        city: 'City 1'
      }
    ]).pipe(delay(1000))
  }

  createEstate(estate: Estate_Dto): Observable<any> {
    return of(estate)
  }

  editEstate(estate: Estate_Dto): Observable<any> {
    return of(estate)
  }

  deleteEstate(estate: Estate_Dto): Observable<any> {
    return of(estate);
  }
}
