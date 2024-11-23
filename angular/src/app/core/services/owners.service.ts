import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner_Dto } from '../../core/models/dtos/owner.dto.model';
import { Owner_Post_Request } from '../models/requests/owner-post-request.model';


@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  get(): Observable<Owner_Dto[]> {
    return this.http.get<Owner_Dto[]>(`${this.API_URL}/owners`);
  }

  create(owner: Owner_Post_Request): Observable<Owner_Dto> {
    return this.http.post<Owner_Dto>(`${this.API_URL}/owners`, owner);
  }

  edit(owner: Owner_Dto): Observable<any> {
    return this.http.patch<Owner_Dto>(`${this.API_URL}/owner`, owner);
  }

  delete(ownerId: string): Observable<any> {
    return this.http.delete<Owner_Dto>(`${this.API_URL}/owners`, {body: {id: ownerId}}).pipe(
      map( result => ownerId)
    )
  }
}
