import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Estate_Dto } from '../../core/models/dtos/estate.dto.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getEstates(): Observable<Estate_Dto[]> {
    console.log('getEstates');
    return this.http.get<Estate_Dto[]>(`${this.API_URL}/estates`);
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
