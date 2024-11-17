import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Estate_Dto } from '../../core/models/dtos/estate.dto.model';
import { environment } from 'src/environments/environment';
import { Estate_Post_Request } from '../models/requests/estate-post-request.model';


@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getEstates(): Observable<Estate_Dto[]> {
    return this.http.get<Estate_Dto[]>(`${this.API_URL}/estates`);
  }

  create(estate: Estate_Post_Request): Observable<Estate_Dto> {
    return this.http.post<Estate_Dto>(`${this.API_URL}/estates`, estate);
  }

  editEstate(estate: Estate_Dto): Observable<any> {
    return this.http.patch<Estate_Dto>(`${this.API_URL}/estate`, estate);
  }

  deleteEstate(estate: Estate_Dto): Observable<any> {
    return of(estate);
  }
}
