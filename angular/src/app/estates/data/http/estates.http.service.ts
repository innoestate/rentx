import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estate_Dto } from '../../models/estate.dto.model';


@Injectable({
  providedIn: 'root'
})
export class EstatesHttpService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getEstates(): Observable<Estate_Dto[]> {
    return this.http.get<Estate_Dto[]>(`${this.API_URL}/estates`);
  }

  create(estate: Estate_Dto): Observable<Estate_Dto> {
    return this.http.post<Estate_Dto>(`${this.API_URL}/estates`, estate);
  }

  editEstate(estate: Estate_Dto): Observable<any> {
    return this.http.patch<Estate_Dto>(`${this.API_URL}/estate`, estate);
  }

  deleteEstate(estateId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/estates`, {body : { id: estateId }});
  }
}
